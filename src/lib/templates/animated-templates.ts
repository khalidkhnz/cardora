export interface AnimatedTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  features: string[];
}

export const animatedTemplates: AnimatedTemplate[] = [
  {
    id: "motion-video",
    name: "Motion Video",
    description: "Tap-to-open envelope with smooth reveal animations",
    category: "Premium",
    preview: "📧",
    features: ["envelope opening", "tap interaction", "smooth transitions"],
  },
  {
    id: "cinematic-film",
    name: "Cinematic Film",
    description: "Auto-play cinematic film-style experience",
    category: "Premium",
    preview: "🎬",
    features: ["auto-play", "cinematic transitions", "parallax"],
  },
  {
    id: "mountain-peak",
    name: "Mountain Peak",
    description: "Majestic mountain backdrop with nature elements",
    category: "Nature",
    preview: "🏔️",
    features: ["parallax scrolling", "nature animations", "fade effects"],
  },
  {
    id: "theater-luxury",
    name: "Theater Luxury",
    description: "Theater-inspired design with animated curtains",
    category: "Premium",
    preview: "🎭",
    features: ["curtain animation", "spotlight effect", "dramatic reveal"],
  },
  {
    id: "mediterranean-elegance",
    name: "Mediterranean Elegance",
    description: "Watercolor-inspired elegant Mediterranean design",
    category: "Elegant",
    preview: "🏛️",
    features: ["watercolor effects", "scroll animations", "elegant typography"],
  },
  {
    id: "raabta",
    name: "Raabta",
    description: "Traditional invitation with Arabic text and multiple events",
    category: "Traditional",
    preview: "🕌",
    features: ["Arabic text support", "multiple events", "traditional motifs"],
  },
  {
    id: "mountains-dark",
    name: "Mountains",
    description: "Dark teal background with golden stars and multiple events",
    category: "Nature",
    preview: "⭐",
    features: ["starry animation", "dark theme", "multiple event sections"],
  },
  {
    id: "beach",
    name: "Beach",
    description: "Beach-themed template with ocean waves",
    category: "Nature",
    preview: "🏖️",
    features: ["wave animation", "beach atmosphere", "tropical colors"],
  },
  {
    id: "city",
    name: "City",
    description: "Urban cityscape template with modern vibes",
    category: "Modern",
    preview: "🌆",
    features: ["city skyline", "modern design", "urban atmosphere"],
  },
  {
    id: "laavan",
    name: "Laavan",
    description: "Traditional Sikh wedding template",
    category: "Traditional",
    preview: "🙏",
    features: ["Gurbani text", "traditional elements", "sacred design"],
  },
  {
    id: "floral-elegance",
    name: "Floral Elegance",
    description: "Delicate floral design with elegant animations",
    category: "Elegant",
    preview: "🌸",
    features: ["floral animations", "elegant transitions", "soft colors"],
  },
  {
    id: "indian-heritage",
    name: "Indian Heritage",
    description: "Traditional Indian design with heritage motifs",
    category: "Traditional",
    preview: "🪔",
    features: ["Indian motifs", "traditional colors", "heritage patterns"],
  },
  {
    id: "minimal-modern",
    name: "Minimal Modern",
    description: "Clean minimalist design with modern aesthetics",
    category: "Modern",
    preview: "◻️",
    features: ["minimal design", "clean typography", "subtle animations"],
  },
  {
    id: "romantic-garden",
    name: "Romantic Garden",
    description: "Garden-themed romantic design with floral elements",
    category: "Romantic",
    preview: "🌹",
    features: ["garden backdrop", "romantic elements", "soft animations"],
  },
  {
    id: "royal-palace",
    name: "Royal Palace",
    description: "Grand royal palace design with opulent details",
    category: "Premium",
    preview: "🏰",
    features: ["palace backdrop", "royal ornaments", "grand animations"],
  },
  {
    id: "cinematic-scroll",
    name: "Cinematic Scroll",
    description: "Cinematic scrolling experience with parallax effects",
    category: "Premium",
    preview: "🎥",
    features: ["cinematic scroll", "parallax layers", "immersive experience"],
  },
  {
    id: "golden-night",
    name: "Golden Night",
    description: "Luxurious golden night theme with starlight effects",
    category: "Luxury",
    preview: "🌟",
    features: ["golden particles", "night sky", "luxury animations"],
  },
];

export function getAnimatedTemplate(id: string) {
  return animatedTemplates.find((t) => t.id === id);
}

export const animatedTemplateCategories = [
  ...new Set(animatedTemplates.map((t) => t.category)),
];
