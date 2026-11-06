import type { Lang } from "./App";

// Per-language <title> and meta description (kept in a plain module so the
// prerender script and the client share one source of truth).
export const SEO: Record<Lang, { title: string; description: string; locale: string }> = {
  en: {
    title: "Windows Clean — Disk Space Analyzer for Windows 10 & 11",
    description:
      "Windows Clean is a free, offline disk space analyzer for Windows. See what's taking up your drive with sunburst, treemap and file-list views, find large forgotten files and reclaim space. No cloud, no telemetry.",
    locale: "en_US",
  },
  de: {
    title: "Windows Clean — Speicherplatz-Analyse für Windows 10 & 11",
    description:
      "Windows Clean ist ein kostenloses Offline-Tool zur Speicherplatz-Analyse für Windows. Sunburst-, Treemap- und Dateilisten-Ansicht, große vergessene Dateien finden und Platz zurückgewinnen. Keine Cloud, keine Telemetrie.",
    locale: "de_DE",
  },
  fr: {
    title: "Windows Clean — Analyseur d'espace disque pour Windows 10 et 11",
    description:
      "Windows Clean est un analyseur d'espace disque gratuit et hors ligne pour Windows. Vues sunburst, treemap et liste de fichiers, détection des gros fichiers oubliés, récupération d'espace. Sans cloud ni télémétrie.",
    locale: "fr_FR",
  },
  es: {
    title: "Windows Clean — Analizador de espacio en disco para Windows 10 y 11",
    description:
      "Windows Clean es un analizador de espacio en disco gratuito y sin conexión para Windows. Vistas sunburst, treemap y lista de archivos, encuentra archivos grandes olvidados y recupera espacio. Sin nube ni telemetría.",
    locale: "es_ES",
  },
  ja: {
    title: "Windows Clean — Windows 10/11向けディスク容量アナライザー",
    description:
      "Windows Cleanは無料・オフラインのWindows用ディスク容量アナライザー。サンバースト、ツリーマップ、ファイルリスト表示で容量を食うファイルを見つけて空き容量を回復。クラウド不要、テレメトリなし。",
    locale: "ja_JP",
  },
};
