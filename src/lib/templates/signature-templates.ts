export interface SignatureTemplate {
  id: string;
  name: string;
  description: string;
  type: "engagement" | "anniversary";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  preview: string;
}

export const signatureTemplates: SignatureTemplate[] = [
  // Engagement (9)
  {
    id: "royal-engagement-gold",
    name: "Royal Engagement Gold",
    description: "Regal golden design for a royal engagement announcement",
    type: "engagement",
    colors: { primary: "#FFD700", secondary: "#FFF8DC", accent: "#DAA520", text: "#4A2800" },
    preview: "👑",
  },
  {
    id: "diamond-ring",
    name: "Diamond Ring",
    description: "Sparkling diamond-themed engagement design",
    type: "engagement",
    colors: { primary: "#E0E0E0", secondary: "#FFFFFF", accent: "#B9F2FF", text: "#1A1A2E" },
    preview: "💍",
  },
  {
    id: "rose-gold-romance",
    name: "Rose Gold Romance",
    description: "Romantic rose gold tones for a modern engagement",
    type: "engagement",
    colors: { primary: "#E8B4B8", secondary: "#F5E6D3", accent: "#B76E79", text: "#4A2030" },
    preview: "🌹",
  },
  {
    id: "emerald-elegance",
    name: "Emerald Elegance",
    description: "Lush emerald greens with elegant accents",
    type: "engagement",
    colors: { primary: "#50C878", secondary: "#E8F5E9", accent: "#2E8B57", text: "#1A3A2A" },
    preview: "💚",
  },
  {
    id: "sapphire-serenity",
    name: "Sapphire Serenity",
    description: "Serene sapphire blues with calming aesthetics",
    type: "engagement",
    colors: { primary: "#0F52BA", secondary: "#E6F2FF", accent: "#1E90FF", text: "#FFFFFF" },
    preview: "💙",
  },
  {
    id: "pearl-perfection",
    name: "Pearl Perfection",
    description: "Pristine pearl tones for a classic engagement",
    type: "engagement",
    colors: { primary: "#F8F6F0", secondary: "#FFFFFF", accent: "#D4C5A9", text: "#4A4A3A" },
    preview: "🦪",
  },
  {
    id: "amethyst-dreams",
    name: "Amethyst Dreams",
    description: "Dreamy amethyst purple for a magical engagement",
    type: "engagement",
    colors: { primary: "#9966CC", secondary: "#E6E6FA", accent: "#7B2FBE", text: "#2A1040" },
    preview: "💜",
  },
  {
    id: "coral-bliss",
    name: "Coral Bliss",
    description: "Warm coral tones for a blissful engagement",
    type: "engagement",
    colors: { primary: "#FF7F50", secondary: "#FFE4E1", accent: "#FF6347", text: "#4A1A10" },
    preview: "🧡",
  },
  {
    id: "ivory-classic",
    name: "Ivory Classic",
    description: "Timeless ivory design for a classic celebration",
    type: "engagement",
    colors: { primary: "#FFFFF0", secondary: "#FFFEF0", accent: "#F5F5DC", text: "#4A4A3A" },
    preview: "🤍",
  },

  // Anniversary (9)
  {
    id: "golden-jubilee",
    name: "Golden Jubilee",
    description: "Celebrate golden years with radiant golden hues",
    type: "anniversary",
    colors: { primary: "#FFD700", secondary: "#FFFACD", accent: "#DAA520", text: "#4A2800" },
    preview: "🌟",
  },
  {
    id: "silver-celebration",
    name: "Silver Celebration",
    description: "Elegant silver tones for a milestone anniversary",
    type: "anniversary",
    colors: { primary: "#C0C0C0", secondary: "#F5F5F5", accent: "#A9A9A9", text: "#2F2F2F" },
    preview: "🥈",
  },
  {
    id: "ruby-romance",
    name: "Ruby Romance",
    description: "Passionate ruby red for a romantic anniversary",
    type: "anniversary",
    colors: { primary: "#E0115F", secondary: "#FFE4E1", accent: "#DC143C", text: "#4A0020" },
    preview: "❤️",
  },
  {
    id: "platinum-perfection",
    name: "Platinum Perfection",
    description: "Refined platinum design for a distinguished anniversary",
    type: "anniversary",
    colors: { primary: "#E5E4E2", secondary: "#F8F8FF", accent: "#C0C0C0", text: "#2F2F4F" },
    preview: "💎",
  },
  {
    id: "crystal-celebration",
    name: "Crystal Celebration",
    description: "Crystal clear elegance for a sparkling anniversary",
    type: "anniversary",
    colors: { primary: "#F0F8FF", secondary: "#FFFFFF", accent: "#B0E0E6", text: "#2F4F6F" },
    preview: "✨",
  },
  {
    id: "copper-charm",
    name: "Copper Charm",
    description: "Warm copper tones for a charming anniversary",
    type: "anniversary",
    colors: { primary: "#B87333", secondary: "#F4E4BC", accent: "#CD853F", text: "#3A2010" },
    preview: "🧡",
  },
  {
    id: "lavender-love",
    name: "Lavender Love",
    description: "Soothing lavender for a loving anniversary",
    type: "anniversary",
    colors: { primary: "#E6E6FA", secondary: "#F5F5F5", accent: "#9370DB", text: "#2F2040" },
    preview: "💜",
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    description: "Warm sunset colors for a glowing anniversary",
    type: "anniversary",
    colors: { primary: "#FF7F50", secondary: "#FFE4B5", accent: "#FF6347", text: "#4A1A10" },
    preview: "🌅",
  },
  {
    id: "midnight-elegance",
    name: "Midnight Elegance",
    description: "Deep midnight tones for a distinguished anniversary",
    type: "anniversary",
    colors: { primary: "#191970", secondary: "#2F2F4F", accent: "#4169E1", text: "#E6E6FA" },
    preview: "🌙",
  },
];

export function getSignatureTemplate(id: string) {
  return signatureTemplates.find((t) => t.id === id);
}

export const engagementTemplates = signatureTemplates.filter((t) => t.type === "engagement");
export const anniversaryTemplates = signatureTemplates.filter((t) => t.type === "anniversary");
