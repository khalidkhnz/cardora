export interface BusinessCardTemplate {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  preview: string;
  category: string;
  layout:
    | "geometric"
    | "split"
    | "dark"
    | "gradient"
    | "corporate"
    | "artistic"
    | "cyber"
    | "organic"
    | "royal"
    | "monochrome";
  style: string;
  fonts: {
    heading: string;
    body: string;
  };
}

export const businessCardTemplates: BusinessCardTemplate[] = [
  {
    id: "geometric-modern",
    name: "Geometric Modern",
    description: "Bold geometric patterns with a modern edge",
    colors: { primary: "#1E3A8A", secondary: "#FFFFFF", accent: "#EF4444" },
    preview: "GEO",
    category: "Modern",
    layout: "geometric",
    style: "bold",
    fonts: {
      heading: "var(--font-montserrat), sans-serif",
      body: "var(--font-montserrat), sans-serif",
    },
  },
  {
    id: "luxury-gold",
    name: "Luxury Gold",
    description: "Opulent gold tones with a luxurious feel",
    colors: { primary: "#78350F", secondary: "#FFFBEB", accent: "#D97706" },
    preview: "LUX",
    category: "Luxury",
    layout: "split",
    style: "luxury",
    fonts: {
      heading: "var(--font-playfair), serif",
      body: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "dark-elegant",
    name: "Dark Elegant",
    description: "Sophisticated dark theme with gold accents",
    colors: { primary: "#0F172A", secondary: "#1E293B", accent: "#D4AF37" },
    preview: "DRK",
    category: "Premium",
    layout: "dark",
    style: "elegant",
    fonts: {
      heading: "var(--font-dm-serif), serif",
      body: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "colorful-gradient",
    name: "Colorful Gradient",
    description: "Vibrant multi-color gradient design",
    colors: { primary: "#7C3AED", secondary: "#EC4899", accent: "#06B6D4" },
    preview: "GRD",
    category: "Creative",
    layout: "gradient",
    style: "vibrant",
    fonts: {
      heading: "var(--font-raleway), sans-serif",
      body: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    description: "Professional design for the corporate world",
    colors: { primary: "#1E40AF", secondary: "#FFFFFF", accent: "#3B82F6" },
    preview: "CRP",
    category: "Professional",
    layout: "corporate",
    style: "professional",
    fonts: {
      heading: "var(--font-montserrat), sans-serif",
      body: "var(--font-montserrat), sans-serif",
    },
  },
  {
    id: "artistic-splash",
    name: "Artistic Splash",
    description: "Creative design for artistic minds",
    colors: { primary: "#9F1239", secondary: "#FFF1F2", accent: "#FB923C" },
    preview: "ART",
    category: "Creative",
    layout: "artistic",
    style: "creative",
    fonts: {
      heading: "var(--font-lora), serif",
      body: "var(--font-montserrat), sans-serif",
    },
  },
  {
    id: "tech-cyber",
    name: "Tech Cyber",
    description: "Futuristic dark theme with neon accents",
    colors: { primary: "#0A0A0A", secondary: "#22D3EE", accent: "#A855F7" },
    preview: "CYB",
    category: "Tech",
    layout: "cyber",
    style: "futuristic",
    fonts: {
      heading: "var(--font-source-code), monospace",
      body: "var(--font-source-code), monospace",
    },
  },
  {
    id: "nature-organic",
    name: "Nature Organic",
    description: "Natural tones with an organic warmth",
    colors: { primary: "#14532D", secondary: "#F0FDF4", accent: "#22C55E" },
    preview: "NAT",
    category: "Nature",
    layout: "organic",
    style: "natural",
    fonts: {
      heading: "var(--font-lora), serif",
      body: "var(--font-lora), serif",
    },
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Regal purple tones for a royal impression",
    colors: { primary: "#581C87", secondary: "#3B0764", accent: "#E9D5FF" },
    preview: "RYL",
    category: "Luxury",
    layout: "royal",
    style: "elegant",
    fonts: {
      heading: "var(--font-cinzel), serif",
      body: "var(--font-raleway), sans-serif",
    },
  },
  {
    id: "premium-black",
    name: "Premium Black",
    description: "Sleek monochrome design with minimal sophistication",
    colors: { primary: "#18181B", secondary: "#FAFAFA", accent: "#A1A1AA" },
    preview: "MIN",
    category: "Premium",
    layout: "monochrome",
    style: "sophisticated",
    fonts: {
      heading: "var(--font-raleway), sans-serif",
      body: "var(--font-raleway), sans-serif",
    },
  },
];

export function getBusinessCardTemplate(id: string) {
  return businessCardTemplates.find((t) => t.id === id);
}

export const businessCardCategories = [
  ...new Set(businessCardTemplates.map((t) => t.category)),
];
