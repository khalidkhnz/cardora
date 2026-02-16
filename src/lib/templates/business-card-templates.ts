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
}

export const businessCardTemplates: BusinessCardTemplate[] = [
  {
    id: "geometric-modern",
    name: "Geometric Modern",
    description: "Bold geometric patterns with a modern edge",
    colors: { primary: "#1E3A8A", secondary: "#FFFFFF", accent: "#EF4444" },
    preview: "🔷",
    category: "Modern",
    layout: "geometric",
    style: "bold",
  },
  {
    id: "luxury-gold",
    name: "Luxury Gold",
    description: "Opulent gold tones with a luxurious feel",
    colors: { primary: "#92400E", secondary: "#FEF3C7", accent: "#FFD700" },
    preview: "✨",
    category: "Luxury",
    layout: "split",
    style: "luxury",
  },
  {
    id: "dark-elegant",
    name: "Dark Elegant",
    description: "Sophisticated dark theme with gold accents",
    colors: { primary: "#0F172A", secondary: "#FFFFFF", accent: "#D4AF37" },
    preview: "🌑",
    category: "Premium",
    layout: "dark",
    style: "elegant",
  },
  {
    id: "colorful-gradient",
    name: "Colorful Gradient",
    description: "Vibrant multi-color gradient design",
    colors: { primary: "#EC4899", secondary: "#8B5CF6", accent: "#06B6D4" },
    preview: "🌈",
    category: "Creative",
    layout: "gradient",
    style: "vibrant",
  },
  {
    id: "corporate-blue",
    name: "Corporate Blue",
    description: "Professional blue design for the corporate world",
    colors: { primary: "#1E40AF", secondary: "#FFFFFF", accent: "#3B82F6" },
    preview: "💼",
    category: "Professional",
    layout: "corporate",
    style: "professional",
  },
  {
    id: "artistic-splash",
    name: "Artistic Splash",
    description: "Creative splash of colors for artistic minds",
    colors: { primary: "#DC2626", secondary: "#FFFFFF", accent: "#F59E0B" },
    preview: "🎨",
    category: "Creative",
    layout: "artistic",
    style: "creative",
  },
  {
    id: "tech-cyber",
    name: "Tech Cyber",
    description: "Futuristic dark theme with neon accents",
    colors: { primary: "#000000", secondary: "#00FF00", accent: "#06B6D4" },
    preview: "💻",
    category: "Tech",
    layout: "cyber",
    style: "futuristic",
  },
  {
    id: "nature-organic",
    name: "Nature Organic",
    description: "Natural green tones with an organic feel",
    colors: { primary: "#166534", secondary: "#D1FAE5", accent: "#10B981" },
    preview: "🌿",
    category: "Nature",
    layout: "organic",
    style: "natural",
  },
  {
    id: "royal-purple",
    name: "Royal Purple",
    description: "Regal purple tones for a royal impression",
    colors: { primary: "#6B21A8", secondary: "#F3E8FF", accent: "#A855F7" },
    preview: "👑",
    category: "Luxury",
    layout: "royal",
    style: "elegant",
  },
  {
    id: "premium-black",
    name: "Premium Black",
    description: "Sleek monochrome design for a sophisticated look",
    colors: { primary: "#000000", secondary: "#FFFFFF", accent: "#6B7280" },
    preview: "⚫",
    category: "Premium",
    layout: "monochrome",
    style: "sophisticated",
  },
];

export function getBusinessCardTemplate(id: string) {
  return businessCardTemplates.find((t) => t.id === id);
}

export const businessCardCategories = [
  ...new Set(businessCardTemplates.map((t) => t.category)),
];
