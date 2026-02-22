export type TemplateReligion = "hindu" | "muslim" | "christian" | "sikh";

export interface AnimatedTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  features: string[];
  religion?: TemplateReligion;
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
    religion: "muslim",
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
    religion: "sikh",
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
    religion: "hindu",
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
  // --- Hindu Templates ---
  {
    id: "mandap-ceremony",
    name: "Mandap Ceremony",
    description: "Traditional Hindu Mandap theme with marigold garlands and sacred motifs",
    category: "Traditional",
    preview: "🛕",
    features: ["mandap canopy", "marigold petals", "sacred motifs"],
    religion: "hindu",
  },
  {
    id: "devi-divine",
    name: "Devi Divine",
    description: "Goddess-inspired divine theme with lotus mandala and peacock feathers",
    category: "Elegant",
    preview: "🪷",
    features: ["lotus mandala", "peacock motifs", "divine elegance"],
    religion: "hindu",
  },
  {
    id: "royal-rajput",
    name: "Royal Rajput",
    description: "Royal Rajasthani heritage theme with haveli arches and elephant motifs",
    category: "Premium",
    preview: "🐘",
    features: ["rajput crest", "haveli arches", "gold dust"],
    religion: "hindu",
  },
  // --- Christian Templates ---
  {
    id: "chapel-grace",
    name: "Chapel Grace",
    description: "Elegant chapel theme with stained glass and dove motifs",
    category: "Elegant",
    preview: "⛪",
    features: ["stained glass", "dove motifs", "holy matrimony"],
    religion: "christian",
  },
  {
    id: "garden-blessing",
    name: "Garden Blessing",
    description: "Outdoor garden ceremony theme with botanical illustrations",
    category: "Nature",
    preview: "🌿",
    features: ["garden arch", "botanical art", "cherry blossom"],
    religion: "christian",
  },
  {
    id: "cathedral-grandeur",
    name: "Cathedral Grandeur",
    description: "Grand cathedral theme with gothic arches and candlelight",
    category: "Premium",
    preview: "🕯️",
    features: ["gothic arches", "rose window", "candlelight"],
    religion: "christian",
  },
  // --- Muslim Templates ---
  {
    id: "nikkah-elegance",
    name: "Nikkah Elegance",
    description: "Elegant Nikkah ceremony theme with Islamic geometric patterns",
    category: "Elegant",
    preview: "🌙",
    features: ["geometric patterns", "arabesque borders", "Bismillah calligraphy"],
    religion: "muslim",
  },
  {
    id: "mughal-grandeur",
    name: "Mughal Grandeur",
    description: "Mughal-era inspired grandeur with jharokha arches and jali patterns",
    category: "Premium",
    preview: "🏯",
    features: ["mughal arches", "jali patterns", "pietra dura"],
    religion: "muslim",
  },
  // --- Sikh Templates ---
  {
    id: "golden-gurdwara",
    name: "Golden Gurdwara",
    description: "Golden temple-inspired Anand Karaj theme with Khanda and Ik Onkar",
    category: "Traditional",
    preview: "🪯",
    features: ["golden dome", "Khanda symbol", "saffron petals"],
    religion: "sikh",
  },
  {
    id: "punjabi-vibrance",
    name: "Punjabi Vibrance",
    description: "Vibrant Punjabi celebration theme with phulkari patterns and truck art",
    category: "Modern",
    preview: "🎊",
    features: ["phulkari patterns", "bangles border", "truck art"],
    religion: "sikh",
  },
];

export function getAnimatedTemplate(id: string) {
  return animatedTemplates.find((t) => t.id === id);
}

export const animatedTemplateCategories = [
  ...new Set(animatedTemplates.map((t) => t.category)),
];

/** Religion labels for the filter row */
export const templateReligions: { value: TemplateReligion; label: string }[] = [
  { value: "hindu", label: "Hindu" },
  { value: "muslim", label: "Muslim" },
  { value: "christian", label: "Christian" },
  { value: "sikh", label: "Sikh" },
];

/**
 * Filter templates by category and/or religion.
 * - `filter === "All"` → all templates
 * - `filter` matches a religion value → templates with that religion
 * - otherwise → filter by category name
 */
export function filterTemplates(filter: string): AnimatedTemplate[] {
  if (filter === "All") return animatedTemplates;
  const religion = templateReligions.find((r) => r.label === filter);
  if (religion) {
    return animatedTemplates.filter((t) => t.religion === religion.value);
  }
  return animatedTemplates.filter((t) => t.category === filter);
}

/** Merged filter row: "All" + style categories + religion labels */
export const animatedTemplateFilters: string[] = [
  "All",
  ...animatedTemplateCategories,
  ...templateReligions.map((r) => r.label),
];
