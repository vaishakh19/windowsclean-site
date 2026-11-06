import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App, { LANG_CODES, type Lang } from "./App.tsx";

// Language comes from the URL (/, /de/, /fr/ ...) so the hydrated markup
// matches the pre-rendered HTML exactly.
function langFromPath(): Lang {
  const rel = window.location.pathname.slice(import.meta.env.BASE_URL.length - 1);
  const seg = rel.split("/").filter(Boolean)[0] as Lang | undefined;
  return seg && LANG_CODES.includes(seg) ? seg : "en";
}

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App initialLang={langFromPath()} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
