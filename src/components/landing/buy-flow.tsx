"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag, Sparkles, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/server/better-auth/client";
import { useCreateRazorpayOrder, useVerifyPayment, useRazorpayCheckout } from "@/hooks/use-payment";
import { type Template } from "@/lib/template-data";

/* ================================================================== */
/*  Buy Flow States                                                   */
/* ================================================================== */

type FlowStep = "checkout" | "processing" | "success" | "error";

/* ================================================================== */
/*  Helpers                                                           */
/* ================================================================== */

/** Parse "C$29.99" → 2999 (cents) */
function parsePriceToCents(price: string): number {
  const num = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Math.round(num * 100);
}

/* ================================================================== */
/*  Session check hook                                                */
/* ================================================================== */

function useSession() {
  const [session, setSession] = useState<{ isLoggedIn: boolean | null; email?: string; name?: string }>({ isLoggedIn: null });

  useEffect(() => {
    void authClient.getSession().then((res) => {
      if (res.data?.session) {
        setSession({
          isLoggedIn: true,
          email: res.data.user?.email ?? undefined,
          name: res.data.user?.name ?? undefined,
        });
      } else {
        setSession({ isLoggedIn: false });
      }
    }).catch(() => {
      setSession({ isLoggedIn: false });
    });
  }, []);

  return session;
}

/* ================================================================== */
/*  Buy Button — used on cards and detail pages                       */
/* ================================================================== */

export function BuyButton({
  template,
  size = "default",
  className,
}: {
  template: Template;
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    setIsOpen(true);
  }, [isLoggedIn, router, pathname]);

  return (
    <>
      <Button
        size={size}
        onClick={handleClick}
        className={`gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-white hover:from-[#C09A2F] hover:to-[#B89848] ${className ?? ""}`}
      >
        <ShoppingBag className="h-4 w-4" />
        Buy Template
      </Button>

      <AnimatePresence>
        {isOpen && (
          <BuyFlowModal template={template} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  Small Buy Button — for template cards                             */
/* ================================================================== */

export function BuyButtonSmall({
  template,
  className,
}: {
  template: Template;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggedIn === null) return;
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    setIsOpen(true);
  }, [isLoggedIn, router, pathname]);

  return (
    <>
      <button
        onClick={handleClick}
        className={`rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] px-3 py-1 text-[10px] font-medium text-white transition-all hover:from-[#C09A2F] hover:to-[#B89848] hover:shadow-sm ${className ?? ""}`}
      >
        Buy
      </button>

      <AnimatePresence>
        {isOpen && (
          <BuyFlowModal template={template} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  Checkout Modal — shown only to logged-in users                    */
/* ================================================================== */

function BuyFlowModal({ template, onClose }: { template: Template; onClose: () => void }) {
  const [step, setStep] = useState<FlowStep>("checkout");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const session = useSession();
  const createOrder = useCreateRazorpayOrder();
  const verifyPayment = useVerifyPayment();
  const { openCheckout } = useRazorpayCheckout();

  const amountInCents = parsePriceToCents(template.price);

  const handlePurchase = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Create Razorpay order
      const order = await createOrder.mutateAsync({
        amount: amountInCents,
        currency: "CAD",
        purpose: "template_purchase",
        itemData: {
          templateId: template.id,
          templateName: template.name,
          templateCategory: template.category,
          templatePrice: template.price,
        },
      });

      // 2. Open Razorpay checkout
      setStep("processing");
      await openCheckout({
        orderId: order.orderId,
        amount: order.amount,
        currency: order.currency,
        keyId: order.keyId,
        name: "Cardora",
        description: `Purchase: ${template.name}`,
        prefillEmail: session.email,
        prefillName: session.name,
        onSuccess: (paymentData) => {
          // 3. Verify payment
          verifyPayment.mutateAsync(paymentData).then(() => {
            setStep("success");
          }).catch(() => {
            setError("Payment verification failed. Please contact support.");
            setStep("error");
          }).finally(() => {
            setLoading(false);
          });
        },
        onDismiss: () => {
          setStep("checkout");
          setLoading(false);
        },
      });
    } catch {
      setError("Could not initiate payment. Please try again.");
      setStep("error");
      setLoading(false);
    }
  }, [amountInCents, createOrder, openCheckout, verifyPayment, session, template.name]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-[#D4AF37]/10 bg-white shadow-2xl dark:bg-[#1A1A1A]"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent line at top */}
        <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37] to-[#D4AF37]/0" />

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted">
          <X className="h-4 w-4" />
        </button>

        <AnimatePresence mode="wait">
          {step === "checkout" && (
            <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 pt-7">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair)" }}>Complete Purchase</h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Unlock this template and start customizing</p>

              {/* Order summary card */}
              <div className="mt-5 overflow-hidden rounded-xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/5 to-transparent">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                        <ShoppingBag className="h-4 w-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.category}</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-[#D4AF37]" style={{ fontFamily: "var(--font-montserrat)" }}>{template.price}</p>
                  </div>
                </div>
                <div className="border-t border-[#D4AF37]/10 bg-[#D4AF37]/[0.03] px-4 py-3">
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[#D4AF37]" /> Full template access</div>
                    <div className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[#D4AF37]" /> Remove watermark</div>
                    <div className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[#D4AF37]" /> Edit &amp; customize</div>
                    <div className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[#D4AF37]" /> Download &amp; share</div>
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="mt-4 rounded-xl border p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <CreditCard className="h-3.5 w-3.5" />
                  Payment Method
                </div>
                <div className="mt-2.5 flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                  <div className="flex h-8 w-12 items-center justify-center rounded bg-[#072654] text-[7px] font-bold tracking-wider text-white">Razorpay</div>
                  <div>
                    <p className="text-xs font-medium">Secure payment via Razorpay</p>
                    <p className="text-[10px] text-muted-foreground">UPI, Cards, Net Banking &amp; more</p>
                  </div>
                </div>
              </div>

              {/* Purchase button */}
              <Button
                onClick={() => void handlePurchase()}
                disabled={loading}
                className="mt-5 w-full gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-white shadow-lg shadow-[#D4AF37]/20 hover:from-[#C09A2F] hover:to-[#B89848]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </span>
                ) : (
                  <>Pay {template.price}</>
                )}
              </Button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                <Shield className="h-3 w-3" />
                Secure checkout · Instant access after payment
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="h-12 w-12 rounded-full border-3 border-[#D4AF37]/20 border-t-[#D4AF37]"
              />
              <p className="mt-4 text-sm font-medium">Opening payment gateway...</p>
              <p className="mt-1 text-xs text-muted-foreground">Complete the payment in the Razorpay window</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, damping: 12 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10"
              >
                <Check className="h-8 w-8 text-[#D4AF37]" />
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="mt-4 text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                Purchase Successful!
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-2 text-sm text-muted-foreground">
                {template.name} is now yours. Start customizing!
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 flex gap-3">
                <Link href="/dashboard">
                  <Button className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-white hover:from-[#C09A2F] hover:to-[#B89848]">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === "error" && (
            <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <X className="h-8 w-8 text-red-500" />
              </div>

              <h2 className="mt-4 text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                Payment Failed
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {error || "Something went wrong. Please try again."}
              </p>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => { setStep("checkout"); setError(""); }}
                  className="gap-2 bg-gradient-to-r from-[#D4AF37] to-[#C6A85A] text-white hover:from-[#C09A2F] hover:to-[#B89848]"
                >
                  Try Again
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
