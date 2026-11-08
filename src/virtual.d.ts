declare module "virtual:articles" {
  type T = { title: string; description: string; category: string; minutes: number };
  const articles: {
    slug: string; title: string; description: string; date: string;
    category: string; image: string; minutes: number;
    translations: Partial<Record<"de" | "fr" | "es" | "ja", T>>;
  }[];
  export default articles;
}
declare const __BUILD_YEAR__: number;
