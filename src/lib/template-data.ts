export interface Template {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNote?: string;
  description: string;
  tags: string[];
  colors: { bg: string; accent: string; text: string };
  style: "wedding" | "business" | "animated" | "dashboard" | "qr" | "global";
  includes: string[];
  features: string[];
}

export const CATEGORIES = [
  "All",
  "Wedding Invitations",
  "Business Cards",
  "Animated Invites",
  "Analytics Dashboard",
  "QR & NFC Sharing",
  "Multi-Country Support",
];

export const TEMPLATES: Template[] = [
  {
    id: "the-maharani",
    name: "The Maharani",
    category: "Wedding Invitations",
    price: "C$29.99",
    description: "Draped in the grandeur of royal Indian heritage — warm ivory, soft florals, and the golden glow of a palace celebration.",
    tags: ["Wedding", "Premium", "Popular"],
    colors: { bg: "from-[#FFF5EA] to-[#FFECD8]", accent: "#D4AF37", text: "#3A1A10" },
    style: "wedding",
    includes: ["Invitation screen", "Event pages (Haldi, Mehendi, Sangeet, Wedding, Reception)", "RSVP form", "Location map", "Photo gallery", "Share via link"],
    features: ["Animated transitions", "Mobile-friendly design", "Easy customization", "Share via QR & link", "Gold accent theme"],
  },
  {
    id: "azure-vows",
    name: "Azure Vows",
    category: "Wedding Invitations",
    price: "C$19.99",
    description: "Where the ocean meets forever — a dreamy beach destination wedding woven with coastal florals, soft light, and the sound of waves.",
    tags: ["Wedding", "Beach", "Christian"],
    colors: { bg: "from-[#E8F4FA] to-[#D4E8F0]", accent: "#5B9EC4", text: "#1A3A4A" },
    style: "wedding",
    includes: ["Invitation screen", "Event pages (Ceremony, Vows, Reception, Cake Cutting)", "RSVP form", "Location map", "Share via link"],
    features: ["Beach destination theme", "Coastal illustrations", "Mobile-friendly", "Easy customization", "Share via QR & link"],
  },
  {
    id: "whispered-vows",
    name: "Whispered Vows",
    category: "Wedding Invitations",
    price: "C$24.99",
    description: "A nostalgic garden celebration told through handwritten letters, vintage frames, and the warm glow of fairy lights.",
    tags: ["Wedding", "Vintage", "Garden"],
    colors: { bg: "from-[#D8CCB4] to-[#C4B89C]", accent: "#5A4830", text: "#2A1E14" },
    style: "wedding",
    includes: ["Invitation screen", "Event pages (Engagement, Haldi, Wedding, Reception)", "RSVP form", "Location map", "Photo gallery"],
    features: ["Vintage paper textures", "Scrapbook-style layout", "Mobile-friendly", "Easy customization", "Share via QR & link"],
  },
  {
    id: "noir-atelier",
    name: "Noir Atelier",
    category: "Business Cards",
    price: "C$9.99",
    description: "A luxury automotive identity — deep charcoal, vintage car silhouette, and gold accents for those who drive excellence.",
    tags: ["Business", "Dark", "Automotive"],
    colors: { bg: "from-[#1E2028] to-[#14161C]", accent: "#C6A85A", text: "#E8E4DC" },
    style: "business",
    includes: ["Front & back design", "QR code integration", "NFC tap support", "Downloadable PDF", "Public profile page", "Analytics dashboard"],
    features: ["Dark luxury theme", "Floating card preview", "QR & NFC sharing", "Custom branding", "Mobile-friendly"],
  },
  {
    id: "maison-blanche",
    name: "Maison Blanche",
    category: "Business Cards",
    price: "C$7.99",
    description: "Ivory parchment, deliberate silence, and one perfect serif — for the professional who curates, never clutters.",
    tags: ["Business", "Minimal"],
    colors: { bg: "from-[#EDE4D4] to-[#DDD0BC]", accent: "#3A2A1A", text: "#1A1A1A" },
    style: "business",
    includes: ["Front & back design", "QR code integration", "NFC tap support", "Downloadable PDF", "Public profile page"],
    features: ["Minimal aesthetic", "Mobile-friendly", "Analytics dashboard", "Share via QR & NFC"],
  },
  {
    id: "opulence-in-motion",
    name: "Opulence in Motion",
    category: "Animated Invites",
    price: "C$49.99",
    priceNote: "one-time",
    description: "Gold particles fall like blessings, music rises like a prayer — a cinematic overture to the most important day of your life.",
    tags: ["Animated", "Premium", "Popular"],
    colors: { bg: "from-[#1A0E1E] to-[#0F0620]", accent: "#D4AF37", text: "#F0E8D8" },
    style: "animated",
    includes: ["Cinematic intro animation", "Event pages with transitions", "Interactive RSVP", "Background music", "Photo gallery with lightbox", "Countdown timer"],
    features: ["Parallax scroll effects", "Background music", "Interactive RSVP system", "Mobile-optimized animations", "Share via link"],
  },
  {
    id: "amber-reverie",
    name: "Amber Reverie",
    category: "Animated Invites",
    price: "C$39.99",
    priceNote: "one-time",
    description: "A dreamlike cascade of amber and coral — scroll through warmth, music, and the golden hour of your forever beginning.",
    tags: ["Animated", "Vibrant"],
    colors: { bg: "from-[#2A1005] to-[#1A0A02]", accent: "#FF8C6A", text: "#FFE0C8" },
    style: "animated",
    includes: ["Animated intro", "Event pages with transitions", "Interactive RSVP", "Background music", "Photo gallery", "Countdown timer"],
    features: ["Sunset color palette", "Smooth scroll animations", "Interactive RSVP", "Mobile-optimized", "Share via link"],
  },
  {
    id: "lumière-insights",
    name: "Lumière Insights",
    category: "Analytics Dashboard",
    price: "C$14.99",
    description: "Illuminate every interaction — views, scans, taps — with a dashboard that turns raw data into refined intelligence.",
    tags: ["Analytics", "Pro"],
    colors: { bg: "from-[#0D1A12] to-[#071210]", accent: "#34D399", text: "#C5E8D0" },
    style: "dashboard",
    includes: ["Real-time view tracking", "QR scan analytics", "NFC tap tracking", "Share tracking", "Weekly/monthly reports", "Export data"],
    features: ["Live data updates", "Beautiful charts", "Mobile-friendly", "Data export"],
  },
  {
    id: "auric-touch",
    name: "Auric Touch",
    category: "QR & NFC Sharing",
    price: "C$12.99",
    description: "One touch, one impression — a golden QR and NFC experience that feels like handing over a silk-embossed calling card.",
    tags: ["QR", "NFC"],
    colors: { bg: "from-[#ECE6DC] to-[#DDD4C6]", accent: "#3A2A1A", text: "#1A1A1A" },
    style: "qr",
    includes: ["Custom QR code", "NFC tap setup", "Direct link sharing", "Profile page", "Download as PDF"],
    features: ["Instant sharing", "Track scans", "Custom branding", "Mobile-optimized"],
  },
  {
    id: "obsidian-cipher",
    name: "Obsidian Cipher",
    category: "QR & NFC Sharing",
    price: "C$19.99",
    description: "Dark, encrypted, unmistakable — a digital identity forged in obsidian, for those who network in the language of the future.",
    tags: ["QR", "NFC", "Dark"],
    colors: { bg: "from-[#1A1C20] to-[#101214]", accent: "#60A0D0", text: "#D0E0F0" },
    style: "qr",
    includes: ["Custom QR code", "NFC tap setup", "Direct link sharing", "Profile page", "Analytics integration"],
    features: ["Dark premium theme", "Real-time analytics", "Custom branding", "Mobile-optimized"],
  },
  {
    id: "chateau-du-nord",
    name: "Château du Nord",
    category: "Multi-Country Support",
    price: "C$14.99",
    description: "From the maple-lined estates of the north — a card steeped in Canadian warmth, powered by Stripe, refined by craft.",
    tags: ["Canada", "Stripe"],
    colors: { bg: "from-[#E8DCC8] to-[#DDD0BC]", accent: "#B03030", text: "#2A1810" },
    style: "global",
    includes: ["CAD pricing", "Stripe integration", "Bilingual support", "Profile page", "QR sharing"],
    features: ["Canadian Dollar payments", "Stripe-powered", "Bilingual ready", "Mobile-optimized"],
  },
  {
    id: "the-cosmopolitan",
    name: "The Cosmopolitan",
    category: "Multi-Country Support",
    price: "C$24.99",
    description: "For the soul that belongs everywhere — a borderless identity card as fluid as your ambitions, as polished as your legacy.",
    tags: ["Global", "Premium"],
    colors: { bg: "from-[#162030] to-[#0E1620]", accent: "#4A90D0", text: "#D0E0F0" },
    style: "global",
    includes: ["Multi-currency support", "Global profile", "Stripe integration", "QR & NFC sharing", "Analytics"],
    features: ["Multi-country ready", "Stripe-powered payments", "Global sharing", "Mobile-optimized"],
  },
];

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
