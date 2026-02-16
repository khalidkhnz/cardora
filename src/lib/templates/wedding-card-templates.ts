export interface WeddingCardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  preview: string;
  backgroundType: "image" | "gradient";
  backgroundImage?: string;
  hasOverlay: boolean;
  hasCouple?: boolean;
  hasGurbani?: boolean;
  hasHindu?: boolean;
}

export const weddingCardTemplates: WeddingCardTemplate[] = [
  // Premium Luxury Templates
  {
    id: "opulent-mandap-indoor",
    name: "Opulent Mandap - Indoor",
    description: "Luxurious indoor mandap setting with golden accents",
    category: "Luxury",
    colors: { primary: "#FFD700", secondary: "#8B0000", accent: "#FFF8DC", text: "#FFFFFF" },
    preview: "🏛️",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "palace-mandap-outdoor",
    name: "Palace Mandap - Outdoor",
    description: "Grand outdoor palace mandap with floral decor",
    category: "Luxury",
    colors: { primary: "#DAA520", secondary: "#800020", accent: "#F5F5DC", text: "#FFFFFF" },
    preview: "🏰",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "sunset-palace-wedding",
    name: "Sunset Palace Wedding",
    description: "Golden hour palace wedding with warm sunset tones",
    category: "Luxury",
    colors: { primary: "#FF8C00", secondary: "#FFD700", accent: "#FFF5EE", text: "#4A0000" },
    preview: "🌅",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "dusk-garden-mandap",
    name: "Dusk Garden Mandap",
    description: "Twilight garden ceremony with fairy lights",
    category: "Luxury",
    colors: { primary: "#4B0082", secondary: "#FFD700", accent: "#E6E6FA", text: "#FFFFFF" },
    preview: "🌙",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "golden-temple-golden-hour",
    name: "Golden Temple - Golden Hour",
    description: "Sacred golden temple bathed in golden hour light",
    category: "Luxury",
    colors: { primary: "#FFD700", secondary: "#DAA520", accent: "#FFFFF0", text: "#4A2800" },
    preview: "🕌",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "golden-temple-soft-light",
    name: "Golden Temple - Soft Light",
    description: "Peaceful temple setting with soft diffused light",
    category: "Luxury",
    colors: { primary: "#F0E68C", secondary: "#BDB76B", accent: "#FFFFF0", text: "#333333" },
    preview: "✨",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "bougainvillea-archway",
    name: "Bougainvillea Archway",
    description: "Romantic floral archway with vibrant bougainvillea",
    category: "Luxury",
    colors: { primary: "#FF1493", secondary: "#FF69B4", accent: "#FFF0F5", text: "#4A0020" },
    preview: "🌺",
    backgroundType: "gradient",
    hasOverlay: true,
  },

  // Heritage & Traditional
  {
    id: "fortified-city-rajasthan",
    name: "Fortified City - Rajasthan",
    description: "Majestic Rajasthani fort backdrop with royal colors",
    category: "Heritage",
    colors: { primary: "#B8860B", secondary: "#8B4513", accent: "#FAEBD7", text: "#FFFFFF" },
    preview: "🏰",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "traditional-wedding-couple",
    name: "Traditional Wedding Couple",
    description: "Classic traditional wedding couple illustration",
    category: "Traditional",
    colors: { primary: "#DC143C", secondary: "#FFD700", accent: "#FFF8DC", text: "#4A0000" },
    preview: "👫",
    backgroundType: "gradient",
    hasOverlay: false,
    hasCouple: true,
  },
  {
    id: "traditional-indian",
    name: "Traditional Indian",
    description: "Rich traditional Indian wedding design with motifs",
    category: "Traditional",
    colors: { primary: "#B22222", secondary: "#FFD700", accent: "#FFF5EE", text: "#FFFFFF" },
    preview: "🪔",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "sikh-anand-karaj",
    name: "Sikh Anand Karaj",
    description: "Sacred Sikh ceremony design with Gurbani script",
    category: "Traditional",
    colors: { primary: "#FF8C00", secondary: "#FFD700", accent: "#FFFFFF", text: "#4A2800" },
    preview: "🙏",
    backgroundType: "gradient",
    hasOverlay: false,
    hasGurbani: true,
  },

  // Hindu Tradition
  {
    id: "hindu-wedding-ceremony",
    name: "Hindu Wedding Ceremony",
    description: "Traditional Hindu ceremony with sacred fire elements",
    category: "Traditional",
    colors: { primary: "#FF4500", secondary: "#FFD700", accent: "#FFFAF0", text: "#4A0000" },
    preview: "🔥",
    backgroundType: "gradient",
    hasOverlay: true,
    hasHindu: true,
  },

  // Elegant & Romantic
  {
    id: "elegant-rose-gold",
    name: "Elegant Rose Gold",
    description: "Sophisticated rose gold tones with delicate florals",
    category: "Elegant",
    colors: { primary: "#B76E79", secondary: "#F7CAC9", accent: "#FFF0F5", text: "#4A2030" },
    preview: "🌹",
    backgroundType: "gradient",
    hasOverlay: false,
  },
  {
    id: "golden-luxury",
    name: "Golden Luxury",
    description: "Pure luxury with golden accents and ornate borders",
    category: "Luxury",
    colors: { primary: "#FFD700", secondary: "#B8860B", accent: "#FFF8DC", text: "#4A2800" },
    preview: "👑",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "romantic-blush",
    name: "Romantic Blush",
    description: "Soft blush tones with romantic watercolor accents",
    category: "Romantic",
    colors: { primary: "#FFB6C1", secondary: "#FFC0CB", accent: "#FFF0F5", text: "#4A0020" },
    preview: "💕",
    backgroundType: "gradient",
    hasOverlay: false,
  },
  {
    id: "vintage-floral",
    name: "Vintage Floral",
    description: "Timeless vintage design with floral watercolor art",
    category: "Vintage",
    colors: { primary: "#BC8F8F", secondary: "#F5F5DC", accent: "#FAF0E6", text: "#4A3030" },
    preview: "🌸",
    backgroundType: "gradient",
    hasOverlay: false,
  },
  {
    id: "premium-couple-golden",
    name: "Premium Couple Golden",
    description: "Premium golden design featuring couple silhouette",
    category: "Premium",
    colors: { primary: "#FFD700", secondary: "#FFA500", accent: "#FFFFF0", text: "#4A2800" },
    preview: "💑",
    backgroundType: "gradient",
    hasOverlay: true,
    hasCouple: true,
  },

  // Additional Premium
  {
    id: "premium-couple-romantic",
    name: "Premium Couple Romantic",
    description: "Romantic couple illustration with soft blush tones",
    category: "Romantic",
    colors: { primary: "#E8B4B8", secondary: "#F5E6D3", accent: "#FFF0F5", text: "#4A2030" },
    preview: "❤️",
    backgroundType: "gradient",
    hasOverlay: false,
    hasCouple: true,
  },
  {
    id: "luxury-couple-elegant",
    name: "Luxury Couple Elegant",
    description: "Elegant couple design with sophisticated palette",
    category: "Elegant",
    colors: { primary: "#708090", secondary: "#C0C0C0", accent: "#F5F5F5", text: "#2F4F4F" },
    preview: "💎",
    backgroundType: "gradient",
    hasOverlay: false,
    hasCouple: true,
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean modern design with minimalist aesthetics",
    category: "Modern",
    colors: { primary: "#2C3E50", secondary: "#ECF0F1", accent: "#FFFFFF", text: "#2C3E50" },
    preview: "◻️",
    backgroundType: "gradient",
    hasOverlay: false,
  },
  {
    id: "royal-maharaja-premium",
    name: "Royal Maharaja Premium",
    description: "Regal design inspired by royal Maharaja heritage",
    category: "Premium",
    colors: { primary: "#FFD700", secondary: "#8B0000", accent: "#FFF8DC", text: "#FFFFFF" },
    preview: "🏛️",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "pearl-palace-premium",
    name: "Pearl Palace Premium",
    description: "Pearlescent palace design with lavender accents",
    category: "Premium",
    colors: { primary: "#E6E6FA", secondary: "#9370DB", accent: "#F8F8FF", text: "#2F2040" },
    preview: "🦪",
    backgroundType: "gradient",
    hasOverlay: true,
  },

  // Diamond & Luxury
  {
    id: "diamond-dreams-premium",
    name: "Diamond Dreams Premium",
    description: "Sparkling diamond-inspired design with icy tones",
    category: "Premium",
    colors: { primary: "#B9F2FF", secondary: "#FFFFFF", accent: "#E0F7FF", text: "#1A3A4A" },
    preview: "💎",
    backgroundType: "gradient",
    hasOverlay: false,
  },
  {
    id: "golden-heritage-premium",
    name: "Golden Heritage Premium",
    description: "Heritage-inspired golden design with ornate patterns",
    category: "Heritage",
    colors: { primary: "#FFD700", secondary: "#FFA500", accent: "#FFFACD", text: "#4A2800" },
    preview: "🏺",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "velvet-royalty-premium",
    name: "Velvet Royalty Premium",
    description: "Rich velvet tones with deep burgundy accents",
    category: "Premium",
    colors: { primary: "#800020", secondary: "#4B0000", accent: "#FFF0F5", text: "#FFD700" },
    preview: "👑",
    backgroundType: "gradient",
    hasOverlay: true,
  },
  {
    id: "platinum-elegance-premium",
    name: "Platinum Elegance Premium",
    description: "Platinum and silver tones with refined elegance",
    category: "Elegant",
    colors: { primary: "#E5E4E2", secondary: "#C0C0C0", accent: "#F8F8FF", text: "#2F2F4F" },
    preview: "🌟",
    backgroundType: "gradient",
    hasOverlay: false,
  },
];

export function getWeddingCardTemplate(id: string) {
  return weddingCardTemplates.find((t) => t.id === id);
}

export const weddingCardCategories = [
  ...new Set(weddingCardTemplates.map((t) => t.category)),
];
