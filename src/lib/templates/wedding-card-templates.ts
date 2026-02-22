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
  layout: "ornate" | "classic" | "romantic" | "regal" | "modern";
  fonts: {
    heading: string;
    body: string;
    script: string;
  };
}

export const weddingCardTemplates: WeddingCardTemplate[] = [
  // ─── LUXURY (ornate layout) ────────────────────────────────
  {
    id: "opulent-mandap-indoor",
    name: "Opulent Mandap",
    description: "Luxurious indoor mandap with golden accents",
    category: "Luxury",
    colors: { primary: "#FFD700", secondary: "#8B0000", accent: "#FFF8DC", text: "#FFFFFF" },
    preview: "OM",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "ornate",
    fonts: {
      heading: "var(--font-cormorant), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "palace-mandap-outdoor",
    name: "Palace Mandap",
    description: "Grand outdoor palace mandap with floral decor",
    category: "Luxury",
    colors: { primary: "#DAA520", secondary: "#800020", accent: "#F5F5DC", text: "#FFFFFF" },
    preview: "PM",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "ornate",
    fonts: {
      heading: "var(--font-cormorant), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "golden-luxury",
    name: "Golden Luxury",
    description: "Pure luxury with golden accents and ornate borders",
    category: "Luxury",
    colors: { primary: "#FFD700", secondary: "#B8860B", accent: "#FFF8DC", text: "#3A1C00" },
    preview: "GL",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "ornate",
    fonts: {
      heading: "var(--font-libre-baskerville), serif",
      body: "var(--font-merriweather), serif",
      script: "var(--font-dancing-script), cursive",
    },
  },
  {
    id: "golden-heritage-premium",
    name: "Golden Heritage",
    description: "Heritage-inspired golden design with ornate patterns",
    category: "Heritage",
    colors: { primary: "#B8860B", secondary: "#6B3A0A", accent: "#FFFACD", text: "#FFFFFF" },
    preview: "GH",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "ornate",
    fonts: {
      heading: "var(--font-cormorant), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "velvet-royalty-premium",
    name: "Velvet Royalty",
    description: "Rich velvet tones with deep burgundy accents",
    category: "Premium",
    colors: { primary: "#800020", secondary: "#4B0000", accent: "#FFD700", text: "#FFD700" },
    preview: "VR",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "ornate",
    fonts: {
      heading: "var(--font-cormorant), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },

  // ─── REGAL (regal layout) ─────────────────────────────────
  {
    id: "sunset-palace-wedding",
    name: "Sunset Palace",
    description: "Golden hour palace wedding with warm sunset tones",
    category: "Luxury",
    colors: { primary: "#FF8C00", secondary: "#C2185B", accent: "#FFF5EE", text: "#FFFFFF" },
    preview: "SP",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "regal",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-cormorant), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "dusk-garden-mandap",
    name: "Dusk Garden",
    description: "Twilight garden ceremony with fairy lights",
    category: "Luxury",
    colors: { primary: "#4B0082", secondary: "#1A0033", accent: "#E6E6FA", text: "#E6E6FA" },
    preview: "DG",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "regal",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-cormorant), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "golden-temple-golden-hour",
    name: "Golden Temple - Golden Hour",
    description: "Sacred golden temple bathed in golden hour light",
    category: "Luxury",
    colors: { primary: "#FFD700", secondary: "#8B6914", accent: "#FFFFF0", text: "#3A2000" },
    preview: "GT",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "regal",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-cormorant), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "golden-temple-soft-light",
    name: "Golden Temple - Soft Light",
    description: "Peaceful temple setting with soft diffused light",
    category: "Luxury",
    colors: { primary: "#DAA520", secondary: "#8B7D3C", accent: "#FFFFF0", text: "#2A2000" },
    preview: "TS",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "regal",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-cormorant), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "royal-maharaja-premium",
    name: "Royal Maharaja",
    description: "Regal design inspired by royal Maharaja heritage",
    category: "Premium",
    colors: { primary: "#FFD700", secondary: "#8B0000", accent: "#FFF8DC", text: "#FFFFFF" },
    preview: "RM",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "regal",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-cormorant), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "pearl-palace-premium",
    name: "Pearl Palace",
    description: "Pearlescent palace design with lavender accents",
    category: "Premium",
    colors: { primary: "#9370DB", secondary: "#4B2D7A", accent: "#F8F8FF", text: "#F8F8FF" },
    preview: "PP",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "regal",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-cormorant), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },

  // ─── TRADITIONAL (classic layout) ─────────────────────────
  {
    id: "fortified-city-rajasthan",
    name: "Rajasthan Heritage",
    description: "Majestic Rajasthani fort backdrop with royal colors",
    category: "Heritage",
    colors: { primary: "#B8860B", secondary: "#5C2D0E", accent: "#FAEBD7", text: "#FAEBD7" },
    preview: "RJ",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "classic",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-lora), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "traditional-wedding-couple",
    name: "Traditional Couple",
    description: "Classic traditional wedding couple illustration",
    category: "Traditional",
    colors: { primary: "#DC143C", secondary: "#8B0A1A", accent: "#FFF8DC", text: "#FFF8DC" },
    preview: "TC",
    backgroundType: "gradient",
    hasOverlay: false,
    hasCouple: true,
    layout: "classic",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-lora), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "traditional-indian",
    name: "Traditional Indian",
    description: "Rich traditional Indian wedding design with motifs",
    category: "Traditional",
    colors: { primary: "#B22222", secondary: "#7A1010", accent: "#FFD700", text: "#FFFFFF" },
    preview: "TI",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "classic",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-lora), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "sikh-anand-karaj",
    name: "Sikh Anand Karaj",
    description: "Sacred Sikh ceremony design with Gurbani script",
    category: "Traditional",
    colors: { primary: "#FF8C00", secondary: "#B35A00", accent: "#FFFFFF", text: "#2A1500" },
    preview: "SK",
    backgroundType: "gradient",
    hasOverlay: false,
    hasGurbani: true,
    layout: "classic",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-lora), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "hindu-wedding-ceremony",
    name: "Hindu Wedding Ceremony",
    description: "Traditional Hindu ceremony with sacred fire elements",
    category: "Traditional",
    colors: { primary: "#FF4500", secondary: "#B22222", accent: "#FFD700", text: "#FFFAF0" },
    preview: "HW",
    backgroundType: "gradient",
    hasOverlay: true,
    hasHindu: true,
    layout: "classic",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-lora), serif",
      script: "var(--font-great-vibes), cursive",
    },
  },

  // ─── ROMANTIC (romantic layout) ────────────────────────────
  {
    id: "bougainvillea-archway",
    name: "Bougainvillea Archway",
    description: "Romantic floral archway with vibrant bougainvillea",
    category: "Romantic",
    colors: { primary: "#DB2777", secondary: "#831843", accent: "#FFF0F5", text: "#FFF0F5" },
    preview: "BA",
    backgroundType: "gradient",
    hasOverlay: true,
    layout: "romantic",
    fonts: {
      heading: "var(--font-crimson-pro), serif",
      body: "var(--font-philosopher), sans-serif",
      script: "var(--font-dancing-script), cursive",
    },
  },
  {
    id: "elegant-rose-gold",
    name: "Elegant Rose Gold",
    description: "Sophisticated rose gold tones with delicate florals",
    category: "Elegant",
    colors: { primary: "#B76E79", secondary: "#8A4252", accent: "#FFF0F5", text: "#FFF0F5" },
    preview: "RG",
    backgroundType: "gradient",
    hasOverlay: false,
    layout: "romantic",
    fonts: {
      heading: "var(--font-playfair), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "romantic-blush",
    name: "Romantic Blush",
    description: "Soft blush tones with romantic watercolor accents",
    category: "Romantic",
    colors: { primary: "#F9A8D4", secondary: "#EC4899", accent: "#FFF0F5", text: "#4A0020" },
    preview: "RB",
    backgroundType: "gradient",
    hasOverlay: false,
    layout: "romantic",
    fonts: {
      heading: "var(--font-playfair), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "vintage-floral",
    name: "Vintage Floral",
    description: "Timeless vintage design with floral watercolor art",
    category: "Vintage",
    colors: { primary: "#BC8F8F", secondary: "#8B6969", accent: "#FDF5E6", text: "#FDF5E6" },
    preview: "VF",
    backgroundType: "gradient",
    hasOverlay: false,
    layout: "romantic",
    fonts: {
      heading: "var(--font-playfair), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },
  {
    id: "premium-couple-romantic",
    name: "Couple Romantic",
    description: "Romantic couple illustration with soft blush tones",
    category: "Romantic",
    colors: { primary: "#E8B4B8", secondary: "#C48A8E", accent: "#FFF0F5", text: "#3A1520" },
    preview: "CR",
    backgroundType: "gradient",
    hasOverlay: false,
    hasCouple: true,
    layout: "romantic",
    fonts: {
      heading: "var(--font-playfair), serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-great-vibes), cursive",
    },
  },

  // ─── MODERN (modern layout) ────────────────────────────────
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description: "Clean modern design with minimalist aesthetics",
    category: "Modern",
    colors: { primary: "#1E293B", secondary: "#0F172A", accent: "#FFFFFF", text: "#F8FAFC" },
    preview: "MM",
    backgroundType: "gradient",
    hasOverlay: false,
    layout: "modern",
    fonts: {
      heading: "var(--font-josefin), sans-serif",
      body: "var(--font-bitter), serif",
      script: "var(--font-josefin), sans-serif",
    },
  },
  {
    id: "diamond-dreams-premium",
    name: "Diamond Dreams",
    description: "Sparkling diamond-inspired design with icy tones",
    category: "Premium",
    colors: { primary: "#E0F2FE", secondary: "#0C4A6E", accent: "#BAE6FD", text: "#0C4A6E" },
    preview: "DD",
    backgroundType: "gradient",
    hasOverlay: false,
    layout: "modern",
    fonts: {
      heading: "var(--font-montserrat), sans-serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "platinum-elegance-premium",
    name: "Platinum Elegance",
    description: "Platinum and silver tones with refined elegance",
    category: "Elegant",
    colors: { primary: "#D4D4D8", secondary: "#3F3F46", accent: "#FAFAFA", text: "#FAFAFA" },
    preview: "PE",
    backgroundType: "gradient",
    hasOverlay: false,
    layout: "modern",
    fonts: {
      heading: "var(--font-montserrat), sans-serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "luxury-couple-elegant",
    name: "Couple Elegant",
    description: "Elegant couple design with sophisticated palette",
    category: "Elegant",
    colors: { primary: "#94A3B8", secondary: "#334155", accent: "#F1F5F9", text: "#F1F5F9" },
    preview: "CE",
    backgroundType: "gradient",
    hasOverlay: false,
    hasCouple: true,
    layout: "modern",
    fonts: {
      heading: "var(--font-montserrat), sans-serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "premium-couple-golden",
    name: "Couple Golden",
    description: "Premium golden design featuring couple silhouette",
    category: "Premium",
    colors: { primary: "#D97706", secondary: "#78350F", accent: "#FEF3C7", text: "#FEF3C7" },
    preview: "CG",
    backgroundType: "gradient",
    hasOverlay: true,
    hasCouple: true,
    layout: "modern",
    fonts: {
      heading: "var(--font-montserrat), sans-serif",
      body: "var(--font-raleway), sans-serif",
      script: "var(--font-raleway), sans-serif",
    },
  },
];

export function getWeddingCardTemplate(id: string) {
  return weddingCardTemplates.find((t) => t.id === id);
}

export const weddingCardCategories = [
  ...new Set(weddingCardTemplates.map((t) => t.category)),
];
