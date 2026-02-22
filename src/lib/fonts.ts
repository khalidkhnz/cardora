import {
  Playfair_Display,
  Cormorant_Garamond,
  Great_Vibes,
  Montserrat,
  Raleway,
  Cinzel,
  Lora,
  Source_Code_Pro,
  DM_Serif_Display,
  Merriweather,
  Josefin_Sans,
  Libre_Baskerville,
  Dancing_Script,
  Crimson_Pro,
  Bitter,
  Philosopher,
  Abril_Fatface,
} from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "600", "700"],
});

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"],
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "700"],
});

export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
  weight: ["400", "500", "600"],
});

export const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
});

export const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["300", "400", "600", "700"],
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "700"],
});

export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  weight: ["300", "400", "600", "700"],
});

export const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  weight: ["300", "400", "600", "700"],
});

export const philosopher = Philosopher({
  subsets: ["latin"],
  variable: "--font-philosopher",
  weight: ["400", "700"],
});

export const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril-fatface",
  weight: "400",
});

export const fontVariables = [
  playfair.variable,
  cormorant.variable,
  greatVibes.variable,
  montserrat.variable,
  raleway.variable,
  cinzel.variable,
  lora.variable,
  sourceCodePro.variable,
  dmSerifDisplay.variable,
  merriweather.variable,
  josefinSans.variable,
  libreBaskerville.variable,
  dancingScript.variable,
  crimsonPro.variable,
  bitter.variable,
  philosopher.variable,
  abrilFatface.variable,
].join(" ");
