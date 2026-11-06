import { renderToString } from "react-dom/server";
import App, { type Lang } from "./App";
export { SEO } from "./seo";

export function render(lang: Lang) {
  return renderToString(<App initialLang={lang} />);
}
