declare module "virtual:articles" {
  const articles: {
    slug: string; title: string; description: string; date: string;
    category: string; image: string; minutes: number;
  }[];
  export default articles;
}
