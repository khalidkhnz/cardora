"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Eye,
  QrCode,
  Smartphone,
  Link2,
  TrendingUp,
  Globe,
  Clock,
  Users,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { platform } from "@/lib/platform";

/* ================================================================== */
/*  Mock Data                                                          */
/* ================================================================== */

const STATS = [
  { label: "Total Views", value: 2847, change: "+24%", icon: Eye, color: "#D4AF37" },
  { label: "QR Scans", value: 482, change: "+18%", icon: QrCode, color: "#8B7355" },
  { label: "NFC Taps", value: 156, change: "+32%", icon: Smartphone, color: "#B8860B" },
  { label: "Link Clicks", value: 1203, change: "+12%", icon: Link2, color: "#6B6560" },
];

const WEEKLY_DATA = [
  { day: "Mon", views: 340, scans: 52, taps: 18 },
  { day: "Tue", views: 420, scans: 68, taps: 22 },
  { day: "Wed", views: 380, scans: 45, taps: 15 },
  { day: "Thu", views: 510, scans: 82, taps: 28 },
  { day: "Fri", views: 460, scans: 75, taps: 24 },
  { day: "Sat", views: 290, scans: 38, taps: 20 },
  { day: "Sun", views: 350, scans: 48, taps: 16 },
];

const RECENT_ACTIVITY = [
  { type: "QR Scan", location: "Toronto, ON", time: "2 min ago", device: "iPhone 15" },
  { type: "NFC Tap", location: "Vancouver, BC", time: "15 min ago", device: "Samsung S24" },
  { type: "Link Click", location: "Montreal, QC", time: "32 min ago", device: "Desktop" },
  { type: "QR Scan", location: "Calgary, AB", time: "1 hour ago", device: "Pixel 8" },
  { type: "Link Click", location: "Ottawa, ON", time: "2 hours ago", device: "MacBook" },
  { type: "NFC Tap", location: "Edmonton, AB", time: "3 hours ago", device: "iPhone 14" },
];

const TOP_SOURCES = [
  { name: "Direct Link", percentage: 42, count: 1203 },
  { name: "QR Code", percentage: 28, count: 482 },
  { name: "NFC Tap", percentage: 18, count: 156 },
  { name: "Social Media", percentage: 12, count: 340 },
];

const MONTHLY_TREND = [65, 72, 58, 85, 78, 92, 88, 105, 98, 115, 108, 128];

/* ================================================================== */
/*  Animated Counter                                                   */
/* ================================================================== */

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{display.toLocaleString()}</>;
}

/* ================================================================== */
/*  Main Experience                                                    */
/* ================================================================== */

export function LumiereInsightsExperience() {
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "sources">("overview");
  const [timeRange, setTimeRange] = useState<"week" | "month">("week");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const maxWeeklyViews = Math.max(...WEEKLY_DATA.map((d) => d.views));

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0A0A0A]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[#E8E4DE]/60 bg-[#FAF8F5]/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#0A0A0A]/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/templates/lumiere-insights">
              <Button variant="ghost" size="sm" className="gap-1.5 text-[#6B6560]">
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </Button>
            </Link>
            <div className="h-5 w-px bg-[#E8E4DE] dark:bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4AF37]/10">
                <BarChart3 className="h-3.5 w-3.5 text-[#D4AF37]" />
              </div>
              <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                Lumière Insights
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#B8860B]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#B8860B]">
            Preview
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-[#6B6560] dark:text-[#A09888]">
                Track every view, scan, and tap on your {platform.name} card
              </p>
            </div>
            {/* Time range */}
            <div className="relative">
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="flex items-center gap-2 rounded-lg border border-[#E8E4DE] bg-white px-3 py-2 text-sm text-[#6B6560] transition-colors hover:border-[#D4AF37]/30 dark:border-white/10 dark:bg-[#141414]"
              >
                <Clock className="h-3.5 w-3.5" />
                {timeRange === "week" ? "This Week" : "This Month"}
                <ChevronDown className="h-3 w-3" />
              </button>
              {showTimeDropdown && (
                <div className="absolute right-0 z-10 mt-1 overflow-hidden rounded-lg border border-[#E8E4DE] bg-white shadow-lg dark:border-white/10 dark:bg-[#141414]">
                  {(["week", "month"] as const).map((t) => (
                    <button key={t} onClick={() => { setTimeRange(t); setShowTimeDropdown(false); }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#F3F0EB] dark:hover:bg-white/5 ${timeRange === t ? "font-medium text-[#B8860B]" : "text-[#6B6560]"}`}
                    >
                      {t === "week" ? "This Week" : "This Month"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="overflow-hidden rounded-xl border border-[#E8E4DE] bg-white p-5 transition-shadow hover:shadow-md dark:border-white/10 dark:bg-[#141414]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F0EB] dark:bg-white/5">
                  <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                </div>
                <span className="flex items-center gap-0.5 rounded-full bg-[#B8860B]/8 px-2 py-0.5 text-[11px] font-medium text-[#B8860B]">
                  <TrendingUp className="h-3 w-3" /> {stat.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-montserrat)" }}>
                {mounted ? <AnimatedNumber value={stat.value} duration={1200 + i * 200} /> : stat.value.toLocaleString()}
              </p>
              <p className="mt-0.5 text-xs text-[#8B8580] dark:text-[#706860]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border border-[#E8E4DE] bg-white p-1 dark:border-white/10 dark:bg-[#141414]">
          {([
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "activity", label: "Recent Activity", icon: Clock },
            { id: "sources", label: "Top Sources", icon: Globe },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A]"
                  : "text-[#6B6560] hover:text-[#1A1A1A] dark:text-[#A09888]"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Chart */}
                <div className="overflow-hidden rounded-xl border border-[#E8E4DE] bg-white p-5 lg:col-span-2 dark:border-white/10 dark:bg-[#141414]">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">
                      {timeRange === "week" ? "Weekly" : "Monthly"} Views
                    </h3>
                    <div className="flex gap-3 text-[11px] text-[#8B8580]">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> Views</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#8B7355]" /> Scans</span>
                    </div>
                  </div>

                  {timeRange === "week" ? (
                    <div className="flex items-end gap-2" style={{ height: 180 }}>
                      {WEEKLY_DATA.map((d, i) => (
                        <motion.div
                          key={d.day}
                          className="flex flex-1 flex-col items-center gap-1"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.08 }}
                          style={{ transformOrigin: "bottom" }}
                        >
                          <div className="relative w-full" style={{ height: 150 }}>
                            <div
                              className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-[#D4AF37]/30 to-[#D4AF37]/60"
                              style={{ height: `${(d.views / maxWeeklyViews) * 100}%` }}
                            />
                            <div
                              className="absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 rounded-t-md bg-[#8B7355]/40"
                              style={{ height: `${(d.scans / maxWeeklyViews) * 100}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-[#8B8580]">{d.day}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <svg viewBox="0 0 300 150" className="w-full" fill="none" style={{ height: 180 }}>
                      <defs>
                        <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {MONTHLY_TREND.map((v, i) => {
                        const x = (i / 11) * 280 + 10;
                        const y = 140 - (v / 130) * 120;
                        const next = MONTHLY_TREND[i + 1];
                        if (next === undefined) return null;
                        const nx = ((i + 1) / 11) * 280 + 10;
                        const ny = 140 - (next / 130) * 120;
                        return (
                          <motion.line key={i} x1={x} y1={y} x2={nx} y2={ny} stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.1, duration: 0.3 }}
                          />
                        );
                      })}
                      {MONTHLY_TREND.map((v, i) => {
                        const x = (i / 11) * 280 + 10;
                        const y = 140 - (v / 130) * 120;
                        return (
                          <motion.circle key={i} cx={x} cy={y} r="3" fill="#D4AF37"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.05 }}
                          />
                        );
                      })}
                    </svg>
                  )}
                </div>

                {/* Top sources mini */}
                <div className="overflow-hidden rounded-xl border border-[#E8E4DE] bg-white p-5 dark:border-white/10 dark:bg-[#141414]">
                  <h3 className="mb-4 font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">Traffic Sources</h3>
                  <div className="space-y-4">
                    {TOP_SOURCES.map((src, i) => (
                      <motion.div key={src.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#6B6560] dark:text-[#A09888]">{src.name}</span>
                          <span className="font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">{src.percentage}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F3F0EB] dark:bg-white/5">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"
                            initial={{ width: 0 }}
                            animate={{ width: `${src.percentage}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="overflow-hidden rounded-xl border border-[#E8E4DE] bg-white dark:border-white/10 dark:bg-[#141414]">
                <div className="border-b border-[#E8E4DE] px-5 py-4 dark:border-white/10">
                  <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">Recent Activity</h3>
                  <p className="text-xs text-[#8B8580] dark:text-[#706860]">Real-time interactions with your card</p>
                </div>
                <div className="divide-y divide-[#E8E4DE] dark:divide-white/10">
                  {RECENT_ACTIVITY.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between px-5 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3F0EB] dark:bg-white/5">
                          {item.type === "QR Scan" && <QrCode className="h-4 w-4 text-[#8B7355]" />}
                          {item.type === "NFC Tap" && <Smartphone className="h-4 w-4 text-[#B8860B]" />}
                          {item.type === "Link Click" && <Link2 className="h-4 w-4 text-[#6B6560]" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">{item.type}</p>
                          <p className="text-[11px] text-[#8B8580] dark:text-[#706860]">{item.location} · {item.device}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#8B8580] dark:text-[#706860]">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "sources" && (
            <motion.div key="sources" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Donut chart */}
                <div className="overflow-hidden rounded-xl border border-[#E8E4DE] bg-white p-5 dark:border-white/10 dark:bg-[#141414]">
                  <h3 className="mb-4 font-semibold text-[#1A1A1A] dark:text-[#F0E8D8]">Source Breakdown</h3>
                  <div className="flex items-center justify-center py-4">
                    <svg viewBox="0 0 100 100" className="h-40 w-40">
                      {(() => {
                        const colors = ["#D4AF37", "#8B7355", "#B8860B", "#C9A96E"];
                        let offset = 0;
                        return TOP_SOURCES.map((src, i) => {
                          const dashLen = (src.percentage / 100) * 251.2;
                          const dashOff = -offset;
                          offset += dashLen;
                          return (
                            <motion.circle key={src.name} cx="50" cy="50" r="40" fill="none" stroke={colors[i]} strokeWidth="12"
                              strokeDasharray={`${dashLen} 251.2`} strokeDashoffset={dashOff}
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.15 }}
                              transform="rotate(-90 50 50)"
                            />
                          );
                        });
                      })()}
                      <text x="50" y="47" textAnchor="middle" className="text-[10px] font-bold" fill="#1A1A1A">2,181</text>
                      <text x="50" y="57" textAnchor="middle" className="text-[5px]" fill="#8B8580">Total</text>
                    </svg>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {TOP_SOURCES.map((src, i) => (
                      <div key={src.name} className="flex items-center gap-2 text-xs text-[#6B6560] dark:text-[#A09888]">
                        <div className="h-2 w-2 rounded-full" style={{ background: ["#D4AF37", "#8B7355", "#B8860B", "#C9A96E"][i] }} />
                        {src.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Source cards */}
                <div className="space-y-3">
                  {TOP_SOURCES.map((src, i) => (
                    <motion.div
                      key={src.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center justify-between rounded-xl border border-[#E8E4DE] bg-white p-4 dark:border-white/10 dark:bg-[#141414]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F0EB] dark:bg-white/5">
                          {i === 0 && <Link2 className="h-4 w-4 text-[#D4AF37]" />}
                          {i === 1 && <QrCode className="h-4 w-4 text-[#8B7355]" />}
                          {i === 2 && <Smartphone className="h-4 w-4 text-[#B8860B]" />}
                          {i === 3 && <Users className="h-4 w-4 text-[#C9A96E]" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#F0E8D8]">{src.name}</p>
                          <p className="text-xs text-[#8B8580] dark:text-[#706860]">{src.count.toLocaleString()} interactions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-[#B8860B]">
                        {src.percentage}%
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white p-8 text-center dark:border-white/10 dark:bg-[#141414]"
        >
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-[#F0E8D8]" style={{ fontFamily: "var(--font-playfair)" }}>
            Unlock Your Analytics
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#6B6560] dark:text-[#A09888]">
            Get real-time insights into how people interact with your {platform.name} card.
            Track views, scans, taps, and more.
          </p>
          <div className="mt-6">
            <Link href="/signup">
              <Button className="gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4A843] px-8 text-white hover:from-[#9A7209] hover:to-[#B8960B]">
                Get Started - C$14.99
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
