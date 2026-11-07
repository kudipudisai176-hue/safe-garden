import {
  Activity,
  Atom,
  Beaker,
  CircleDot,
  Droplets,
  Flower2,
  FlaskConical,
  Gauge,
  Leaf,
  Microscope,
  Mountain,
  Package,
  Sprout,
  TestTube2,
  Waves,
  Zap,
  Wheat,
} from "lucide-react";

export const company = {
  brand: "SAFE",
  fullName: "Sumitra Agro Food Enterprises",
  phone: import.meta.env.VITE_CONTACT_PHONE || "8497957002",
  email: import.meta.env.VITE_CONTACT_EMAIL || "info.safeagro@gmail.com",
  address: import.meta.env.VITE_CONTACT_ADDRESS || "",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "918497957002",
};

export const images = {
  hero: "/images/hero.jpeg",
  soil: "/images/soil-testing.jpeg",
  water: "/images/water-testing.jpg",
};

export const navItems = [
  { id: "home", label: "Home" },
  {
    id: "testing",
    label: "Testing",
    children: [
      { id: "soil-testing", label: "Soil Testing" },
      { id: "water-testing", label: "Water Testing" },
    ],
  },
  { id: "field-management", label: "Field Management" },
  { id: "products", label: "Products" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const products = [
  { name: "Malli", category: "Plant", icon: Flower2 },
  { name: "Compost", category: "Organic soil input", icon: Sprout },
  { name: "Neem powder", category: "Organic soil input", icon: Leaf },
  { name: "Organic potash", category: "Organic fertilizer", icon: Mountain },
  { name: "Bio fertilizers", category: "Bio fertilizer", icon: Sprout },
  { name: "Fermented Organic manure", category: "Organic manure", icon: Wheat },
  { name: "Plants", category: "Plants", icon: Flower2 },
  { name: "Seeds", category: "Seeds", icon: Sprout },
  { name: "Fertilizers", category: "Fertilizers", icon: Package },
];

export const soilParameters = [
  { name: "pH", description: "Shows whether soil is acidic, neutral, or alkaline.", icon: Activity },
  { name: "EC", detail: "Electrical Conductivity", description: "Indicates the level of soluble salts in soil.", icon: Zap },
  { name: "OC", detail: "Organic Carbon", description: "Measures organic matter content that supports soil structure and fertility.", icon: Leaf },
  { name: "Nitrogen", description: "An essential nutrient for leafy growth and plant development.", icon: Sprout },
  { name: "Phosphorus", description: "Supports root development, flowering, and energy transfer in plants.", icon: Atom },
  { name: "Potassium", description: "Supports water regulation and plant resilience.", icon: CircleDot },
  { name: "Sulphur", description: "An essential nutrient involved in protein formation.", icon: Mountain },
  { name: "Magnesium", description: "A central component of chlorophyll and photosynthesis.", icon: Atom },
  { name: "Calcium", description: "Supports cell structure and healthy root growth.", icon: CircleDot },
  { name: "Iron", description: "A micronutrient involved in chlorophyll formation.", icon: FlaskConical },
  { name: "Zinc", description: "A micronutrient that supports normal plant growth.", icon: Microscope },
  { name: "Boron", description: "A micronutrient important for flowering and cell development.", icon: Beaker },
  { name: "Copper", description: "A micronutrient involved in plant enzyme processes.", icon: TestTube2 },
];

export const waterParameters = [
  { name: "pH", description: "Shows whether the water is acidic, neutral, or alkaline.", icon: Activity },
  { name: "EC", detail: "Electrical Conductivity", description: "Indicates the concentration of dissolved ionic salts.", icon: Zap },
  { name: "CO₃", detail: "Carbonate", description: "Measures carbonate content relevant to irrigation water chemistry.", icon: Beaker },
  { name: "HCO₃", detail: "Bicarbonate", description: "Measures bicarbonate, which can affect soil and water alkalinity.", icon: TestTube2 },
  { name: "Cl", detail: "Chloride", description: "Measures chloride concentration in the water sample.", icon: Droplets },
  { name: "Ca + Mg", detail: "Calcium + Magnesium", description: "Measures combined calcium and magnesium content.", icon: CircleDot },
  { name: "Na + K", detail: "Sodium + Potassium", description: "Measures combined sodium and potassium content.", icon: Atom },
  { name: "SAR", detail: "Sodium Adsorption Ratio", description: "Relates sodium to calcium and magnesium for irrigation assessment.", icon: Gauge },
  { name: "TDS", detail: "Total Dissolved Solids", description: "Indicates the total concentration of dissolved substances.", icon: Waves },
];
