export const portfolioCategories = ["All", "Portraits", "Family", "Celebrations", "Prints"] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioPhoto = {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, "All">;
  alt: string;
  width: number;
  height: number;
};

export const portfolioPhotos: readonly PortfolioPhoto[] = [
  { slug: "sunset-portrait", title: "The last light", category: "Portraits", alt: "Outdoor portrait of a smiling woman in an orange patterned dress and white shawl beneath a sunset sky", width: 1022, height: 1280 },
  { slug: "family-studio", title: "Together, always", category: "Family", alt: "Two adults and a young child wearing white tops and blue denim in a bright studio", width: 888, height: 1280 },
  { slug: "couple-at-dusk", title: "A moment for two", category: "Celebrations", alt: "A couple embracing outdoors at dusk, with a colourful red dress and blue headwrap in the foreground", width: 853, height: 1280 },
  { slug: "birthday-piano", title: "Little notes, big memories", category: "Celebrations", alt: "Child seated at a white toy piano beside pink, black and white balloons for a first birthday portrait", width: 1280, height: 1042 },
  { slug: "roses-studio", title: "Say it with roses", category: "Portraits", alt: "Studio portrait of a woman in a black suit seated beside a bouquet of red roses", width: 1280, height: 809 },
  { slug: "birthday-blue-car", title: "One wonderful year", category: "Celebrations", alt: "Child in a blue toy convertible with pink and black balloons and a first birthday cake", width: 1280, height: 911 },
  { slug: "portrait-print", title: "Beyond the screen", category: "Prints", alt: "Photographic print leaning against a textured wall, showing a woman in a white dress holding red roses", width: 866, height: 1280 },
  { slug: "birthday-red-and-blue", title: "A bright beginning", category: "Celebrations", alt: "Child in red shorts at a white toy piano surrounded by red, white and blue first birthday balloons", width: 1280, height: 1280 },
];

export function filterPortfolio(category: PortfolioCategory) {
  return category === "All" ? portfolioPhotos : portfolioPhotos.filter((photo) => photo.category === category);
}

export function photoSource(photo: PortfolioPhoto) {
  return `/images/portfolio/${photo.slug}.jpeg`;
}
