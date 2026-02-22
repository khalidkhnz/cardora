"use client";

import { motion } from "framer-motion";
import { platform } from "@/lib/platform";

export function CardoraWatermark({ className }: { className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0 }}
      className={className ?? "mt-12 pb-8 text-center text-xs text-gray-400"}
    >
      {platform.watermarkText}
    </motion.p>
  );
}
