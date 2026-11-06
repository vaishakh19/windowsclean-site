import { useState, useEffect, useMemo, useRef } from "react";
import { SEO } from "./seo";
import ARTICLES from "virtual:articles";
import { DOWNLOAD_URL, DOWNLOAD_FILE, CHECKOUT_URL } from "../site.config.mjs";
import dashboardImg from "./assets/5dd7c760c45d2c10-image_1b2327.jpg";
import treemapImg from "./assets/080a13f798bd0652-image_bde4c5.jpg";
import sunburstImg from "./assets/89998cc106f512b1-image_7462fa.jpg";
import filelistImg from "./assets/d40e9e426f6c85f2-image_ed87b5.jpg";
import pricingImg from "./assets/5d310f5a4c0732a5-image_2c836f.jpg";

type Lang = "en" | "de" | "fr" | "es" | "ja";

const LANGS = [
  { code: "en" as Lang, flag: "🇺🇸", label: "English", short: "EN" },
  { code: "de" as Lang, flag: "🇩🇪", label: "Deutsch", short: "DE" },
  { code: "fr" as Lang, flag: "🇫🇷", label: "Français", short: "FR" },
  { code: "es" as Lang, flag: "🇪🇸", label: "Español", short: "ES" },
  { code: "ja" as Lang, flag: "🇯🇵", label: "日本語", short: "JA" },
];

const THEMES = [
  { id: "sage", color: "#B7D485", label: "Sage" },
  { id: "clay", color: "#D86E2C", label: "Clay" },
  { id: "sky", color: "#7FB0D8", label: "Sky" },
  { id: "peach", color: "#FFAA7A", label: "Peach" },
];

const PRO_SOON: Record<Lang, string> = {
  en: "Windows Clean Pro is coming soon.",
  de: "Windows Clean Pro kommt bald.",
  fr: "Windows Clean Pro arrive bientôt.",
  es: "Windows Clean Pro llegará pronto.",
  ja: "Windows Clean Proは近日公開です。",
};

const dict = {
  en: {
    nav_features: "Features",
    nav_visual: "Visualizations",
    nav_pricing: "Free vs Pro",
    nav_cases: "Cases",
    nav_articles: "Articles",
    nav_docs: "Docs",
    getStarted: "Download Free",
    kicker: "NEW — Now supports Windows 11 24H2",
    hero_title: "See what's taking up your space.",
    hero_sub: "Meet Windows Clean, your storage inspector",
    hero_desc: "A beautifully simple, offline tool that visualizes disk usage, finds large forgotten files, and helps you reclaim space. No cloud. No telemetry.",
    hero_download: "Download for Windows — Free",
    hero_how: "See screenshots ↓",
    trust: "Trusted by 12,400+ designers & developers. Offline. Private.",
    stats_scanned: "GB Analyzed",
    stats_files: "Files",
    stats_folders: "Folders",
    stats_time: "Scan",
    dashboard_kicker: "01 — DASHBOARD",
    dashboard_title: "Your PC is full? See exactly why in 3 seconds",
    dashboard_sub: "Understand Your Disk in Seconds",
    dashboard_p1: "No more guessing where your storage went. Windows Clean shows everything at a glance.",
    dashboard_b1_t: "VOLUMES — At a glance",
    dashboard_b1_d: "C: drive 99% full with only 1.46GB free vs D: drive healthy at 45%. You see the problem instantly. Color-coded progress bars: red = critical, green = safe.",
    dashboard_b2_t: "WINDOWS STORAGE — Actionable cards",
    dashboard_b2_d: "Recycle Bin 899MB with a note: files here are counted, not ghost space. System Restore (Admin Required) — restore points you forgot. Hiberfil.sys 2.94GB — disable hibernation and reclaim it instantly. Pagefile.sys, Delivery Optimization, all measured.",
    dashboard_b3_t: "System Protected, safely explained",
    dashboard_b3_d: "We don't let you break Windows. Files like WinSxS, Installer cache, System32 are flagged 'System Protected' with warnings. Learn what they do before you touch them. Safe deletion only — always to Recycle Bin, never permanent.",
    viz_kicker: "02 — THREE WAYS TO SEE",
    viz_title: "One drive. Three powerful lenses.",
    viz_sub: "Switch views. Find the hogs. Reclaim space your way.",
    tab_sunburst: "Sunburst",
    tab_treemap: "Treemap",
    tab_filelist: "File List",
    sun_head: "Sunburst — See your entire drive at a glance",
    sun_copy: "One circular map. Every folder is a segment. The bigger the slice, the more space it eats. Click any segment to drill down. Local Disk (C:) 213GB visualized instantly — 693K files, 253K folders. 110K items too small to draw? We group them smartly so you never miss the big picture. Perfect for first scan.",
    sun_stats: ["213 GB Total", "693K Files mapped", "Hover = instant preview", "Click = dive deeper"],
    tree_head: "Treemap — Find the space hogs instantly",
    tree_copy: "That purple block? Grand Theft Auto V — 114GB gone. WinSxS 6GB, Arduino15 13.7GB, JetBrains 1.02GB — spot them in 1 second. No scrolling through folders for hours. Color-coded by type: Applications 65%, Other 33%, Development 1.5%, Documents. Bigger rectangle = bigger problem. Right-click to open, reveal, or delete safely.",
    tree_stats: ["114 GB GTA V found", "6 GB WinSxS explained", "65% Apps, 33% Other", "Instant color search"],
    list_head: "File List — The power of Explorer, 100x faster",
    list_copy: "Program Files (x86) 123GB with 28K files, Users 47GB with 489K files, Windows 22.8GB — sorted by size. See exact file counts, last modified dates (2025/11/25), percentages. Quick actions: Open file, Reveal in Explorer, Rename (F2), Cut, Copy path, Delete (to Recycle Bin, never permanent). Search bar: 'Search in Local Disk (C:)' live. This is what Explorer should have been.",
    list_stats: ["123 GB Program Files (x86)", "Size • Files • Modified • %", "Safe actions: Open, Reveal, Delete to Bin", "Live search"],
    power_kicker: "03 — POWER FEATURES",
    power_title: "Everything power users asked for. Nothing extra.",
    power_sub: "Built from real screenshots, not mockups.",
    pf_large_t: "Large Files",
    pf_large_d: "Instantly filter >1GB, >100MB, older than 1 year. Find that 4K render from 2022 in seconds. Sort by size, age, extension.",
    pf_dup_t: "Duplicate Finder",
    pf_dup_d: "Smart name matching (case-insensitive) + size filters. Find 1,200 duplicate logos before you waste backup space.",
    pf_search_t: "Super Power Search — Pro",
    pf_search_d: "Combine AND / OR, regex, wildcards, modified / created date ranges, extension groups. Save presets. For devs who need precision.",
    pf_types_t: "File Types",
    pf_types_d: "Group by Images, Videos, Archives, Code. See that Videos = 140GB instantly.",
    pf_old_t: "Old & Unused",
    pf_old_d: "Files not opened in 2+ years. Safe to archive. Preview before you act.",
    pf_cleanup_t: "Cleanup & Safe Delete",
    pf_cleanup_d: "Every delete moves to Recycle Bin with confirmation showing exact name, full path and size. Nothing ever deleted permanently without you knowing.",
    pf_hist_t: "Scan & Deletion History",
    pf_hist_d: "Every scan logged with time. Every deletion with undo path. Audit trail for teams.",
    pricing_kicker: "04 — FREE vs PRO",
    pricing_title: "Free forever. Pro once.",
    pricing_sub: "No subscription. No account. Pay $12.99 once, use permanently.",
    free_title: "FREE",
    free_price: "$0",
    free_sub: "Always Free",
    free_features: [
      "Scanning, filtering, size calculations",
      "Large-file listing and duplicate detection",
      "Name match (case-insensitive)",
      "Large-file filters: min size, extension, age",
      "Duplicate filters: min size, exclude folders",
      "Treemap, Sunburst, File List views",
      "Open, Reveal in Explorer",
    ],
    pro_title: "PRO",
    pro_price: "$12.99",
    pro_sub: "Pay once, use permanently",
    pro_features: [
      "Super Power Search: AND/OR, date ranges, regex/wildcards, extension groups, save presets",
      "Safe file deletion: moves to Recycle Bin with confirmation showing exact name, full path and size",
      "Full paths and file actions: view/copy absolute paths, reveal in Explorer, open with default app",
      "CSV export: export scan results with full paths",
      "No renewals, No subscription, No account",
      "Purchased badge — lifetime",
    ],
    pro_trust: "Nothing leaves your PC. Offline and read-only. System Protected warnings. Safe deletion only. 2.4MB installer, uninstalls cleanly.",
    pro_cta: "Get Pro — $12.99 once",
    cases_kicker: "05 — REAL SAVINGS",
    cases_title: "Real people, real space reclaimed.",
    case1_name: "Alex • Gamer",
    case1_metric: "+114GB",
    case1_story: "Found Grand Theft Auto V double install: Rockstar + Steam. 114GB purple block in Treemap made it obvious. Deleted old version, kept saves.",
    case2_name: "Mira K. • Developer",
    case2_metric: "+18GB",
    case2_story: "WinSxS 6GB + Arduino15 13.7GB + JetBrains cache 1GB. Sunburst showed Development taking 1.5% but hiding 20GB. Compacted safely.",
    case3_name: "Lumen Studio • 12 people",
    case3_metric: "+87GB",
    case3_story: "NAS with 4 years of exports. File List sorted by Modified showed 2021 files never opened. Large Files view found 200MB Figma exports x400.",
    articles_kicker: "06 — LEARN",
    articles_title: "Articles & Guides",
    articles_sub: "Practical storage wisdom. No fluff.",
    search_ph: "Search guides...",
    final_title: "Ready to see what's hiding?",
    final_sub: "Free during beta. 2.4MB download. Uninstalls cleanly. No admin for user folders.",
    final_download: "Download Windows Clean Free",
    final_email_ph: "you@studio.com",
    final_email_btn: "Get v1 launch email",
    footer_note: "Built offline. No telemetry. No cookies.",
    toast_download: "Starting download — Windows-Clean-setup.exe",
    toast_lang: "Language updated",
    min_read: "min read",
    read_article: "Read",
    read_case: "View scan",
  },
  de: {
    nav_features: "Funktionen",
    nav_visual: "Visualisierungen",
    nav_pricing: "Free vs Pro",
    nav_cases: "Fälle",
    nav_articles: "Artikel",
    nav_docs: "Docs",
    getStarted: "Kostenlos laden",
    kicker: "NEU — Windows 11 24H2 Support",
    hero_title: "Sieh, was deinen Speicher frisst.",
    hero_sub: "Windows Clean, dein Speicher-Inspektor",
    hero_desc: "Ein einfaches Offline-Tool, das Festplattennutzung visualisiert, große vergessene Dateien findet und Speicher zurückholt. Keine Cloud. Keine Telemetrie.",
    hero_download: "Für Windows laden — Kostenlos",
    hero_how: "Screenshots ansehen ↓",
    trust: "Vertraut von 12.400+ Designern & Entwicklern. Offline. Privat.",
    stats_scanned: "GB Analysiert",
    stats_files: "Dateien",
    stats_folders: "Ordner",
    stats_time: "Scan",
    dashboard_kicker: "01 — DASHBOARD",
    dashboard_title: "PC voll? Sieh in 3 Sekunden warum",
    dashboard_sub: "Verstehe deine Festplatte in Sekunden",
    dashboard_p1: "Kein Raten mehr. Windows Clean zeigt alles auf einen Blick.",
    dashboard_b1_t: "VOLUMES — Auf einen Blick",
    dashboard_b1_d: "C: 99% voll mit nur 1,46GB frei vs D: gesund bei 45%. Du siehst das Problem sofort. Farbcodierte Balken: rot = kritisch, grün = sicher.",
    dashboard_b2_t: "WINDOWS STORAGE — Aktionskarten",
    dashboard_b2_d: "Papierkorb 899MB mit Hinweis: Dateien gezählt, kein Geisterspeicher. Systemwiederherstellung (Admin nötig) — vergessene Wiederherstellungspunkte. Hiberfil.sys 2,94GB — Ruhezustand deaktivieren und sofort zurückholen.",
    dashboard_b3_t: "Systemgeschützt, sicher erklärt",
    dashboard_b3_d: "Wir lassen dich Windows nicht zerstören. WinSxS, Installer-Cache, System32 sind als 'Systemgeschützt' mit Warnungen markiert. Lerne, was sie tun, bevor du sie anfasst. Sicheres Löschen nur in Papierkorb, nie permanent.",
    viz_kicker: "02 — DREI ANSICHTEN",
    viz_title: "Ein Laufwerk. Drei mächtige Linsen.",
    viz_sub: "Ansichten wechseln. Platzfresser finden. Auf deine Art aufräumen.",
    tab_sunburst: "Sunburst",
    tab_treemap: "Treemap",
    tab_filelist: "Dateiliste",
    sun_head: "Sunburst — Gesamtes Laufwerk auf einen Blick",
    sun_copy: "Eine kreisförmige Karte. Jeder Ordner ein Segment. Je größer das Stück, desto mehr Platz frisst es. Klick zum Eintauchen. Lokaler Datenträger (C:) 213GB sofort visualisiert — 693K Dateien, 253K Ordner. 110K zu klein zum Zeichnen? Wir gruppieren intelligent.",
    sun_stats: ["213 GB Gesamt", "693K Dateien", "Hover = Sofort-Vorschau", "Klick = tiefer"],
    tree_head: "Treemap — Platzfresser sofort finden",
    tree_copy: "Der lila Block? Grand Theft Auto V — 114GB weg. WinSxS 6GB, Arduino15 13,7GB, JetBrains 1,02GB — in 1 Sekunde erkannt. Keine stundenlange Ordnersuche. Farbcodiert nach Typ: Anwendungen 65%, Andere 33%, Entwicklung 1,5%",
    tree_stats: ["114 GB GTA V gefunden", "6 GB WinSxS erklärt", "65% Apps, 33% Sonstige", "Sofortige Farbsuche"],
    list_head: "Dateiliste — Power des Explorers, 100x schneller",
    list_copy: "Programme (x86) 123GB mit 28K Dateien, Benutzer 47GB mit 489K Dateien, Windows 22,8GB — nach Größe sortiert. Exakte Anzahlen, Änderungsdaten, Schnellaktionen: Öffnen, Anzeigen, Umbenennen F2, Ausschneiden, Pfad kopieren, Löschen in Papierkorb.",
    list_stats: ["123 GB Programme (x86)", "Größe • Dateien • Geändert • %", "Sicher: Öffnen, Anzeigen, In Papierkorb", "Live-Suche"],
    power_kicker: "03 — POWER FEATURES",
    power_title: "Alles was Power-User wollten. Nichts extra.",
    power_sub: "Aus echten Screenshots gebaut, nicht Mockups.",
    pf_large_t: "Große Dateien",
    pf_large_d: "Sofort filtern >1GB, >100MB, älter als 1 Jahr. Den 4K-Render von 2022 in Sekunden finden.",
    pf_dup_t: "Duplikat-Finder",
    pf_dup_d: "Intelligentes Namens-Matching + Größenfilter. 1.200 doppelte Logos finden bevor Backup verschwendet wird.",
    pf_search_t: "Super Power Search — Pro",
    pf_search_d: "Kombiniere AND / OR, Regex, Wildcards, Datumsbereiche, Erweiterungsgruppen. Presets speichern.",
    pf_types_t: "Dateitypen",
    pf_types_d: "Gruppiere nach Bildern, Videos, Archiven, Code. Sieh sofort Videos = 140GB.",
    pf_old_t: "Alt & Ungenutzt",
    pf_old_d: "Dateien, die seit 2+ Jahren nicht geöffnet wurden. Sicher archivierbar. Vorschau vor Aktion.",
    pf_cleanup_t: "Cleanup & Sicheres Löschen",
    pf_cleanup_d: "Jedes Löschen geht in Papierkorb mit Bestätigung: exakter Name, voller Pfad und Größe.",
    pf_hist_t: "Scan- & Lösch-Historie",
    pf_hist_d: "Jeder Scan mit Zeit geloggt. Jede Löschung mit Undo-Pfad. Audit-Trail für Teams.",
    pricing_kicker: "04 — FREE vs PRO",
    pricing_title: "Für immer kostenlos. Pro einmalig.",
    pricing_sub: "Kein Abo. Kein Konto. $12.99 einmalig, für immer nutzen.",
    free_title: "FREE",
    free_price: "$0",
    free_sub: "Immer kostenlos",
    free_features: [
      "Scannen, Filtern, Größenberechnung",
      "Große Dateien & Duplikate finden",
      "Namens-Match (Groß/Klein egal)",
      "Filter: Mindestgröße, Erweiterung, Alter",
      "Duplikat-Filter: Mindestgröße, Ordner ausschließen",
      "Treemap, Sunburst, Dateiliste",
      "Öffnen, Im Explorer anzeigen",
    ],
    pro_title: "PRO",
    pro_price: "$12.99",
    pro_sub: "Einmal zahlen, für immer nutzen",
    pro_features: [
      "Super Power Search: AND/OR, Datumsbereiche, Regex/Wildcards, Erweiterungsgruppen, Presets speichern",
      "Sicheres Löschen: in Papierkorb mit Bestätigung Name, Pfad, Größe",
      "Volle Pfade & Aktionen: absolute Pfade ansehen/kopieren, im Explorer zeigen, mit Standard-App öffnen",
      "CSV Export: Scan-Ergebnisse mit vollen Pfaden exportieren",
      "Keine Verlängerungen, Kein Abo, Kein Konto",
      "Purchased Badge — lebenslang",
    ],
    pro_trust: "Nichts verlässt deinen PC. Offline und nur lesend. Systemgeschützt-Warnungen. Nur sicheres Löschen. 2,4MB Installer.",
    pro_cta: "Pro holen — $12.99 einmalig",
    cases_kicker: "05 — ECHTE EINSPARUNGEN",
    cases_title: "Echte Menschen, echter freier Speicher.",
    case1_name: "Alex • Gamer",
    case1_metric: "+114GB",
    case1_story: "Grand Theft Auto V doppelt installiert: Rockstar + Steam. 114GB lila Block im Treemap machte es offensichtlich. Alte Version gelöscht, Saves behalten.",
    case2_name: "Mira K. • Entwicklerin",
    case2_metric: "+18GB",
    case2_story: "WinSxS 6GB + Arduino15 13,7GB + JetBrains Cache 1GB. Sunburst zeigte Entwicklung 1,5% versteckt aber 20GB. Sicher kompaktiert.",
    case3_name: "Lumen Studio • 12 Leute",
    case3_metric: "+87GB",
    case3_story: "NAS mit 4 Jahren Exporten. Dateiliste nach Geändert sortiert zeigte 2021 Dateien nie geöffnet. Große Dateien fand 200MB Figma Exports x400.",
    articles_kicker: "06 — LERNEN",
    articles_title: "Artikel & Guides",
    articles_sub: "Praktisches Speicher-Wissen. Kein Blabla.",
    search_ph: "Guides suchen...",
    final_title: "Bereit zu sehen, was sich versteckt?",
    final_sub: "Kostenlos in Beta. 2,4MB Download. Saubere Deinstallation.",
    final_download: "Windows Clean kostenlos laden",
    final_email_ph: "du@studio.com",
    final_email_btn: "v1 Launch E-Mail",
    footer_note: "Offline gebaut. Keine Telemetrie. Keine Cookies.",
    toast_download: "Download — Windows-Clean-setup.exe",
    toast_lang: "Sprache aktualisiert",
    min_read: "Min. Lesezeit",
    read_article: "Lesen",
    read_case: "Scan ansehen",
  },
  fr: {
    nav_features: "Fonctionnalités",
    nav_visual: "Visualisations",
    nav_pricing: "Gratuit vs Pro",
    nav_cases: "Cas clients",
    nav_articles: "Articles",
    nav_docs: "Docs",
    getStarted: "Télécharger",
    kicker: "NOUVEAU — Support Windows 11 24H2",
    hero_title: "Voyez ce qui prend votre espace.",
    hero_sub: "Windows Clean, votre inspecteur de stockage",
    hero_desc: "Un outil simple, hors ligne, qui visualise l'utilisation disque, trouve les gros fichiers oubliés et vous aide à récupérer de l'espace. Pas de cloud. Pas de télémétrie.",
    hero_download: "Télécharger pour Windows — Gratuit",
    hero_how: "Voir les captures ↓",
    trust: "Approuvé par 12 400+ designers & développeurs. Hors ligne. Privé.",
    stats_scanned: "Go Analysés",
    stats_files: "Fichiers",
    stats_folders: "Dossiers",
    stats_time: "Scan",
    dashboard_kicker: "01 — TABLEAU DE BORD",
    dashboard_title: "PC plein ? Voyez exactement pourquoi en 3 secondes",
    dashboard_sub: "Comprenez votre disque en secondes",
    dashboard_p1: "Fini de deviner où est parti votre stockage. Windows Clean montre tout d'un coup d'œil.",
    dashboard_b1_t: "VOLUMES — En un coup d'œil",
    dashboard_b1_d: "C: 99% plein avec seulement 1,46Go libre vs D: sain à 45%. Vous voyez le problème instantanément. Barres colorées : rouge = critique, vert = sûr.",
    dashboard_b2_t: "STOCKAGE WINDOWS — Cartes actionnables",
    dashboard_b2_d: "Corbeille 899Mo avec note : fichiers comptés, pas d'espace fantôme. Restauration système (Admin requis) — points oubliés. Hiberfil.sys 2,94Go — désactivez hibernation et récupérez-le.",
    dashboard_b3_t: "Protégé système, expliqué en sécurité",
    dashboard_b3_d: "On ne vous laisse pas casser Windows. WinSxS, cache Installer, System32 sont marqués 'Protégé système' avec avertissements. Apprenez leur rôle avant de toucher. Suppression sécurisée uniquement — toujours vers Corbeille, jamais définitif.",
    viz_kicker: "02 — TROIS FAÇONS DE VOIR",
    viz_title: "Un disque. Trois lentilles puissantes.",
    viz_sub: "Changez de vue. Trouvez les gloutons. Récupérez à votre façon.",
    tab_sunburst: "Sunburst",
    tab_treemap: "Treemap",
    tab_filelist: "Liste fichiers",
    sun_head: "Sunburst — Voyez tout votre disque d'un coup",
    sun_copy: "Une carte circulaire. Chaque dossier est un segment. Plus la tranche est grosse, plus elle mange d'espace. Cliquez pour explorer. Disque Local (C:) 213Go visualisé instantanément — 693K fichiers, 253K dossiers. 110K trop petits ? On les groupe intelligemment.",
    sun_stats: ["213 Go Total", "693K Fichiers mappés", "Survol = aperçu instantané", "Clic = plonger"],
    tree_head: "Treemap — Trouvez les gloutons instantanément",
    tree_copy: "Ce bloc violet ? Grand Theft Auto V — 114Go partis. WinSxS 6Go, Arduino15 13,7Go, JetBrains 1,02Go — repérés en 1 seconde. Pas d'heures à fouiller les dossiers. Codé par couleur par type : Applications 65%, Autre 33%, Développement 1,5%",
    tree_stats: ["114 Go GTA V trouvé", "6 Go WinSxS expliqué", "65% Apps, 33% Autre", "Recherche couleur instantanée"],
    list_head: "Liste fichiers — La puissance de l'Explorateur, 100x plus rapide",
    list_copy: "Program Files (x86) 123Go avec 28K fichiers, Users 47Go avec 489K fichiers, Windows 22,8Go — trié par taille. Comptes exacts, dates modifiées, actions rapides : Ouvrir, Révéler, Renommer F2, Couper, Copier chemin, Supprimer (vers Corbeille, jamais définitif).",
    list_stats: ["123 Go Program Files (x86)", "Taille • Fichiers • Modifié • %", "Actions sûres : Ouvrir, Révéler, Corbeille", "Recherche live"],
    power_kicker: "03 — FONCTIONS PUISSANTES",
    power_title: "Tout ce que les power users ont demandé. Rien de plus.",
    power_sub: "Construit à partir de vraies captures, pas de maquettes.",
    pf_large_t: "Gros fichiers",
    pf_large_d: "Filtrez instantanément >1Go, >100Mo, plus vieux qu'1 an. Trouvez ce rendu 4K de 2022 en secondes.",
    pf_dup_t: "Doublons",
    pf_dup_d: "Matching intelligent noms + filtres taille. Trouvez 1 200 logos dupliqués avant de gaspiller backup.",
    pf_search_t: "Super Power Search — Pro",
    pf_search_d: "Combinez AND / OR, regex, jokers, plages dates modif/création, groupes extensions. Sauvez presets.",
    pf_types_t: "Types fichiers",
    pf_types_d: "Groupez par Images, Vidéos, Archives, Code. Voyez instantanément Vidéos = 140Go.",
    pf_old_t: "Anciens & Inutilisés",
    pf_old_d: "Fichiers non ouverts depuis 2+ ans. Sûr à archiver. Aperçu avant action.",
    pf_cleanup_t: "Nettoyage & Suppression sûre",
    pf_cleanup_d: "Chaque suppression va en Corbeille avec confirmation nom exact, chemin complet et taille.",
    pf_hist_t: "Historique scans & suppressions",
    pf_hist_d: "Chaque scan loggé avec heure. Chaque suppression avec chemin undo. Audit trail pour équipes.",
    pricing_kicker: "04 — GRATUIT vs PRO",
    pricing_title: "Gratuit pour toujours. Pro une fois.",
    pricing_sub: "Pas d'abonnement. Pas de compte. Payez $12.99 une fois, utilisez à vie.",
    free_title: "GRATUIT",
    free_price: "$0",
    free_sub: "Toujours gratuit",
    free_features: [
      "Scan, filtrage, calcul tailles",
      "Liste gros fichiers et détection doublons",
      "Match noms (insensible casse)",
      "Filtres gros fichiers : taille min, extension, âge",
      "Filtres doublons : taille min, exclure dossiers",
      "Vues Treemap, Sunburst, Liste",
      "Ouvrir, Révéler dans Explorateur",
    ],
    pro_title: "PRO",
    pro_price: "$12.99",
    pro_sub: "Payez une fois, utilisez à vie",
    pro_features: [
      "Super Power Search : AND/OR, plages dates, regex/jokers, groupes extensions, presets sauvés",
      "Suppression sûre : vers Corbeille avec confirmation nom exact, chemin complet et taille",
      "Chemins complets & actions : voir/copier chemins absolus, révéler dans Explorateur, ouvrir avec app défaut",
      "Export CSV : exportez résultats scan avec chemins complets",
      "Pas de renouvellements, Pas d'abonnement, Pas de compte",
      "Badge Purchased — à vie",
    ],
    pro_trust: "Rien ne quitte votre PC. Hors ligne et lecture seule. Avertissements Protégé système. Suppression sûre uniquement. Installateur 2,4Mo.",
    pro_cta: "Obtenir Pro — $12.99 une fois",
    cases_kicker: "05 — ÉCONOMIES RÉELLES",
    cases_title: "De vraies personnes, du vrai espace récupéré.",
    case1_name: "Alex • Gamer",
    case1_metric: "+114Go",
    case1_story: "Grand Theft Auto V double install : Rockstar + Steam. Bloc violet 114Go en Treemap évident. Ancienne version supprimée, sauvegardes gardées.",
    case2_name: "Mira K. • Développeuse",
    case2_metric: "+18Go",
    case2_story: "WinSxS 6Go + Arduino15 13,7Go + cache JetBrains 1Go. Sunburst montrait Dev 1,5% mais cachait 20Go. Compacté en sécurité.",
    case3_name: "Lumen Studio • 12 pers.",
    case3_metric: "+87Go",
    case3_story: "NAS avec 4 ans d'exports. Liste fichiers triée par Modifié montrait fichiers 2021 jamais ouverts. Vue Gros fichiers trouva exports Figma 200Mo x400.",
    articles_kicker: "06 — APPRENDRE",
    articles_title: "Articles & Guides",
    articles_sub: "Sagesse stockage pratique. Pas de blabla.",
    search_ph: "Chercher guides...",
    final_title: "Prêt à voir ce qui se cache ?",
    final_sub: "Gratuit en bêta. 2,4Mo. Désinstallation propre. Pas d'admin pour dossiers utilisateur.",
    final_download: "Télécharger Windows Clean Gratuit",
    final_email_ph: "vous@studio.com",
    final_email_btn: "Email lancement v1",
    footer_note: "Construit hors ligne. Pas de télémétrie. Pas de cookies.",
    toast_download: "Téléchargement — Windows-Clean-setup.exe",
    toast_lang: "Langue mise à jour",
    min_read: "min lecture",
    read_article: "Lire",
    read_case: "Voir scan",
  },
  es: {
    nav_features: "Funciones",
    nav_visual: "Visualizaciones",
    nav_pricing: "Gratis vs Pro",
    nav_cases: "Casos",
    nav_articles: "Artículos",
    nav_docs: "Docs",
    getStarted: "Descargar",
    kicker: "NUEVO — Soporte Windows 11 24H2",
    hero_title: "Ve qué está ocupando tu espacio.",
    hero_sub: "Windows Clean, tu inspector de almacenamiento",
    hero_desc: "Una herramienta simple, offline, que visualiza uso de disco, encuentra archivos grandes olvidados y te ayuda a recuperar espacio. Sin nube. Sin telemetría.",
    hero_download: "Descargar para Windows — Gratis",
    hero_how: "Ver capturas ↓",
    trust: "Confiado por 12.400+ diseñadores y devs. Offline. Privado.",
    stats_scanned: "GB Analizados",
    stats_files: "Archivos",
    stats_folders: "Carpetas",
    stats_time: "Escaneo",
    dashboard_kicker: "01 — PANEL",
    dashboard_title: "¿PC lleno? Ve exactamente por qué en 3 segundos",
    dashboard_sub: "Entiende tu disco en segundos",
    dashboard_p1: "No más adivinar dónde se fue tu almacenamiento. Windows Clean muestra todo de un vistazo.",
    dashboard_b1_t: "VOLÚMENES — De un vistazo",
    dashboard_b1_d: "C: 99% lleno con solo 1,46GB libre vs D: saludable al 45%. Ves el problema al instante. Barras de colores: rojo = crítico, verde = seguro.",
    dashboard_b2_t: "ALMACENAMIENTO WINDOWS — Tarjetas accionables",
    dashboard_b2_d: "Papelera 899MB con nota: archivos contados, no espacio fantasma. Restaurar sistema (Admin requerido) — puntos olvidados. Hiberfil.sys 2,94GB — desactiva hibernación y recupéralo.",
    dashboard_b3_t: "Protegido del sistema, explicado seguro",
    dashboard_b3_d: "No te dejamos romper Windows. WinSxS, caché Installer, System32 están marcados 'Protegido del sistema' con advertencias. Aprende qué hacen antes de tocar. Borrado seguro solo — siempre a Papelera, nunca permanente.",
    viz_kicker: "02 — TRES FORMAS DE VER",
    viz_title: "Un disco. Tres lentes poderosas.",
    viz_sub: "Cambia vistas. Encuentra glotones. Recupera a tu manera.",
    tab_sunburst: "Sunburst",
    tab_treemap: "Treemap",
    tab_filelist: "Lista archivos",
    sun_head: "Sunburst — Ve todo tu disco de un vistazo",
    sun_copy: "Un mapa circular. Cada carpeta es un segmento. Más grande el trozo, más espacio come. Clic para profundizar. Disco Local (C:) 213GB visualizado al instante — 693K archivos, 253K carpetas. ¿110K muy pequeños? Los agrupamos inteligentemente.",
    sun_stats: ["213 GB Total", "693K Archivos mapeados", "Hover = vista previa", "Clic = profundizar"],
    tree_head: "Treemap — Encuentra glotones al instante",
    tree_copy: "¿Ese bloque morado? Grand Theft Auto V — 114GB perdidos. WinSxS 6GB, Arduino15 13,7GB, JetBrains 1,02GB — detectados en 1 segundo. Sin horas revisando carpetas. Colores por tipo: Aplicaciones 65%, Otro 33%, Desarrollo 1,5%",
    tree_stats: ["114 GB GTA V hallado", "6 GB WinSxS explicado", "65% Apps, 33% Otro", "Búsqueda color instantánea"],
    list_head: "Lista archivos — El poder del Explorador, 100x más rápido",
    list_copy: "Archivos de programa (x86) 123GB con 28K archivos, Usuarios 47GB con 489K, Windows 22,8GB — ordenado por tamaño. Conteos exactos, fechas modificación, acciones rápidas: Abrir, Revelar, Renombrar F2, Cortar, Copiar ruta, Eliminar (a Papelera, nunca permanente).",
    list_stats: ["123 GB Archivos programa (x86)", "Tamaño • Archivos • Modificado • %", "Acciones seguras: Abrir, Revelar, Papelera", "Búsqueda en vivo"],
    power_kicker: "03 — FUNCIONES POTENTES",
    power_title: "Todo lo que usuarios avanzados pidieron. Nada extra.",
    power_sub: "Construido con capturas reales, no mockups.",
    pf_large_t: "Archivos grandes",
    pf_large_d: "Filtra al instante >1GB, >100MB, más de 1 año. Encuentra ese render 4K de 2022 en segundos.",
    pf_dup_t: "Duplicados",
    pf_dup_d: "Matching inteligente nombres + filtros tamaño. Encuentra 1.200 logos duplicados antes de desperdiciar backup.",
    pf_search_t: "Super Power Search — Pro",
    pf_search_d: "Combina AND / OR, regex, comodines, rangos fechas modificado/creado, grupos extensión. Guarda presets.",
    pf_types_t: "Tipos archivo",
    pf_types_d: "Agrupa por Imágenes, Videos, Archivos, Código. Ve que Videos = 140GB al instante.",
    pf_old_t: "Antiguos e Inutilizados",
    pf_old_d: "Archivos no abiertos en 2+ años. Seguro archivar. Vista previa antes.",
    pf_cleanup_t: "Limpieza y borrado seguro",
    pf_cleanup_d: "Cada borrado va a Papelera con confirmación nombre exacto, ruta completa y tamaño.",
    pf_hist_t: "Historial escaneos y borrados",
    pf_hist_d: "Cada escaneo logueado con hora. Cada borrado con ruta undo. Audit trail para equipos.",
    pricing_kicker: "04 — GRATIS vs PRO",
    pricing_title: "Gratis para siempre. Pro una vez.",
    pricing_sub: "Sin suscripción. Sin cuenta. Paga $12.99 una vez, usa para siempre.",
    free_title: "GRATIS",
    free_price: "$0",
    free_sub: "Siempre Gratis",
    free_features: [
      "Escaneo, filtrado, cálculo tamaños",
      "Listado archivos grandes y detección duplicados",
      "Match nombres (sin mayúsculas)",
      "Filtros archivos grandes: tamaño min, extensión, edad",
      "Filtros duplicados: tamaño min, excluir carpetas",
      "Vistas Treemap, Sunburst, Lista",
      "Abrir, Revelar en Explorador",
    ],
    pro_title: "PRO",
    pro_price: "$12.99",
    pro_sub: "Paga una vez, usa para siempre",
    pro_features: [
      "Super Power Search: AND/OR, rangos fechas, regex/comodines, grupos extensión, presets guardados",
      "Borrado seguro: a Papelera con confirmación nombre exacto, ruta completa y tamaño",
      "Rutas completas y acciones: ver/copiar rutas absolutas, revelar en Explorador, abrir con app defecto",
      "Export CSV: exporta resultados escaneo con rutas completas",
      "Sin renovaciones, Sin suscripción, Sin cuenta",
      "Insignia Purchased — de por vida",
    ],
    pro_trust: "Nada sale de tu PC. Offline y solo lectura. Advertencias Protegido del sistema. Solo borrado seguro. Instalador 2,4MB.",
    pro_cta: "Obtener Pro — $12.99 una vez",
    cases_kicker: "05 — AHORROS REALES",
    cases_title: "Personas reales, espacio real recuperado.",
    case1_name: "Alex • Gamer",
    case1_metric: "+114GB",
    case1_story: "Grand Theft Auto V doble instalado: Rockstar + Steam. Bloque morado 114GB en Treemap obvio. Borrada versión vieja, saves guardados.",
    case2_name: "Mira K. • Dev",
    case2_metric: "+18GB",
    case2_story: "WinSxS 6GB + Arduino15 13,7GB + caché JetBrains 1GB. Sunburst mostró Desarrollo 1,5% pero escondía 20GB. Compactado seguro.",
    case3_name: "Lumen Studio • 12 pers.",
    case3_metric: "+87GB",
    case3_story: "NAS con 4 años exports. Lista archivos por Modificado mostró archivos 2021 nunca abiertos. Vista Archivos grandes encontró exports Figma 200MB x400.",
    articles_kicker: "06 — APRENDER",
    articles_title: "Artículos y Guías",
    articles_sub: "Sabiduría práctica de almacenamiento. Sin rodeos.",
    search_ph: "Buscar guías...",
    final_title: "¿Listo para ver qué se esconde?",
    final_sub: "Gratis en beta. 2,4MB. Desinstalación limpia. Sin admin para carpetas usuario.",
    final_download: "Descargar Windows Clean Gratis",
    final_email_ph: "tu@estudio.com",
    final_email_btn: "Email lanzamiento v1",
    footer_note: "Construido offline. Sin telemetría. Sin cookies.",
    toast_download: "Descargando — Windows-Clean-setup.exe",
    toast_lang: "Idioma actualizado",
    min_read: "min lectura",
    read_article: "Leer",
    read_case: "Ver escaneo",
  },
  ja: {
    nav_features: "機能",
    nav_visual: "可視化",
    nav_pricing: "無料 vs Pro",
    nav_cases: "事例",
    nav_articles: "記事",
    nav_docs: "ドキュメント",
    getStarted: "無料DL",
    kicker: "新着 — Windows 11 24H2 対応",
    hero_title: "何が容量を圧迫しているか、一目で。",
    hero_sub: "Windows Clean — ストレージインスペクター",
    hero_desc: "ディスク使用量を美しく可視化し、忘れられた巨大ファイルを発見、空き容量を取り戻すシンプルなオフライン・ツール。クラウドなし。テレメトリなし。",
    hero_download: "Windows版を無料ダウンロード",
    hero_how: "スクショを見る ↓",
    trust: "12,400人以上のデザイナーと開発者が信頼。オフライン。プライベート。",
    stats_scanned: "GB 解析",
    stats_files: "ファイル",
    stats_folders: "フォルダ",
    stats_time: "スキャン",
    dashboard_kicker: "01 — ダッシュボード",
    dashboard_title: "PCが満杯？3秒で原因がわかる",
    dashboard_sub: "ディスクを数秒で理解する",
    dashboard_p1: "ストレージがどこに消えたか推測する必要はもうありません。Windows Cleanが一目で全てを表示します。",
    dashboard_b1_t: "ボリューム — 一目で把握",
    dashboard_b1_d: "C:ドライブ 99%満杯で空き1.46GBのみ vs D:ドライブ 45%で健全。問題が即座にわかります。色分けプログレスバー：赤＝危険、緑＝安全。",
    dashboard_b2_t: "Windowsストレージ — アクション可能なカード",
    dashboard_b2_d: "ごみ箱 899MB — 注記付き：ファイルはカウント済み、ゴーストではありません。システム復元（管理者必要）— 忘れられた復元ポイント。Hiberfil.sys 2.94GB — 休止状態を無効化して即回収。",
    dashboard_b3_t: "システム保護、安全性を説明",
    dashboard_b3_d: "Windowsを壊させません。WinSxS、インストーラーキャッシュ、System32は「システム保護」として警告付きでマーク。触る前に何をするか学べます。安全な削除のみ — 常にごみ箱へ、決して完全削除しません。",
    viz_kicker: "02 — 3つの視点",
    viz_title: "1つのドライブ。3つの強力なレンズ。",
    viz_sub: "ビューを切り替え。容量泥棒を見つけ。自分らしい方法で回収。",
    tab_sunburst: "Sunburst",
    tab_treemap: "Treemap",
    tab_filelist: "ファイルリスト",
    sun_head: "Sunburst — ドライブ全体を一目で",
    sun_copy: "1つの円形マップ。すべてのフォルダがセグメント。スライスが大きいほど容量を食っています。クリックでドリルダウン。ローカルディスク(C:) 213GBを即座に可視化 — 693Kファイル、253Kフォルダ。110K項目が小さすぎて描画不可？賢くグループ化して全体像を逃しません。",
    sun_stats: ["213 GB 合計", "693K ファイルマッピング", "ホバー＝即時プレビュー", "クリック＝深掘り"],
    tree_head: "Treemap — 容量泥棒を即座に発見",
    tree_copy: "あの紫のブロック？Grand Theft Auto V — 114GB消失。WinSxS 6GB、Arduino15 13.7GB、JetBrains 1.02GB — 1秒で発見。何時間もフォルダをスクロールする必要なし。タイプ別に色分け：アプリケーション65%、その他33%、開発1.5%",
    tree_stats: ["114 GB GTA V発見", "6 GB WinSxS解説", "65%アプリ、33%その他", "即時カラー検索"],
    list_head: "ファイルリスト — Explorerの力を100倍高速に",
    list_copy: "Program Files (x86) 123GB 28Kファイル、Users 47GB 489Kファイル、Windows 22.8GB — サイズ順にソート。正確なファイル数、最終更新日、クイックアクション：開く、エクスプローラーで表示、名前変更F2、切り取り、パスをコピー、削除（ごみ箱へ、決して完全削除しない）。検索バー：「ローカルディスク(C:)内を検索」ライブ。",
    list_stats: ["123 GB Program Files (x86)", "サイズ • ファイル • 更新日 • %", "安全操作：開く、表示、ごみ箱へ", "ライブ検索"],
    power_kicker: "03 — パワー機能",
    power_title: "パワーユーザーが求めた全て。余計なものは無し。",
    power_sub: "モックではなく実際のスクリーンショットから構築。",
    pf_large_t: "大きなファイル",
    pf_large_d: "即時フィルター >1GB、>100MB、1年以上前。2022年の4Kレンダー数秒で発見。",
    pf_dup_t: "重複ファインダー",
    pf_dup_d: "スマートな名前一致（大文字小文字無視）＋サイズフィルター。バックアップを無駄にする前に1,200の重複ロゴを発見。",
    pf_search_t: "Super Power Search — Pro",
    pf_search_d: "AND / OR、regex、ワイルドカード、更新/作成日範囲、拡張子グループを組み合わせ。プリセット保存。",
    pf_types_t: "ファイルタイプ",
    pf_types_d: "画像、動画、アーカイブ、コードでグループ化。動画＝140GBが即座にわかる。",
    pf_old_t: "古い＆未使用",
    pf_old_d: "2年以上開かれていないファイル。アーカイブしても安全。実行前にプレビュー。",
    pf_cleanup_t: "クリーンアップ＆安全な削除",
    pf_cleanup_d: "すべての削除は正確な名前、フルパス、サイズを表示する確認付きでごみ箱へ。知らないうちに完全削除されることは絶対にありません。",
    pf_hist_t: "スキャン＆削除履歴",
    pf_hist_d: "すべてのスキャンは時刻付きでログ化。すべての削除はUndoパス付き。チーム向け監査証跡。",
    pricing_kicker: "04 — 無料 vs Pro",
    pricing_title: "永遠に無料。Proは一度きり。",
    pricing_sub: "サブスクなし。アカウントなし。$12.99を一度払えば永久に使えます。",
    free_title: "無料",
    free_price: "$0",
    free_sub: "常に無料",
    free_features: [
      "スキャン、フィルタリング、サイズ計算",
      "大容量ファイル一覧と重複検出",
      "名前一致（大文字小文字無視）",
      "大容量フィルター：最小サイズ、拡張子、経過",
      "重複フィルター：最小サイズ、除外フォルダ",
      "Treemap、Sunburst、ファイルリスト表示",
      "開く、エクスプローラーで表示",
    ],
    pro_title: "PRO",
    pro_price: "$12.99",
    pro_sub: "一度払えば永久に",
    pro_features: [
      "Super Power Search：AND/OR、日付範囲、regex/ワイルドカード、拡張子グループ、プリセット保存",
      "安全な削除：正確な名前、フルパス、サイズを表示する確認付きでごみ箱へ移動",
      "フルパスとファイル操作：絶対パスの表示/コピー、エクスプローラーで表示、既定アプリで開く",
      "CSVエクスポート：フルパス付きでスキャン結果をエクスポート",
      "更新料なし、サブスクなし、アカウントなし",
      "Purchasedバッジ — 永久",
    ],
    pro_trust: "PCから何も外部に出ません。オフラインで読み取り専用。システム保護警告。安全な削除のみ。2.4MBインストーラー。",
    pro_cta: "Proを取得 — $12.99一度きり",
    cases_kicker: "05 — 実際の節約",
    cases_title: "リアルな人、リアルに空いた容量。",
    case1_name: "Alex • ゲーマー",
    case1_metric: "+114GB",
    case1_story: "Grand Theft Auto Vの二重インストール発見：Rockstar + Steam。Treemapの紫114GBブロックで一目瞭然。古いバージョンを削除、セーブは保持。",
    case2_name: "Mira K. • 開発者",
    case2_metric: "+18GB",
    case2_story: "WinSxS 6GB + Arduino15 13.7GB + JetBrainsキャッシュ1GB。Sunburstで開発1.5%が20GB隠しているのを表示。安全に圧縮。",
    case3_name: "Lumen Studio • 12人",
    case3_metric: "+87GB",
    case3_story: "4年分の書き出しがあるNAS。ファイルリストを更新日順でソートすると2021年の未開封ファイルが表示。大容量ビューで200MBのFigma書き出しx400を発見。",
    articles_kicker: "06 — 学ぶ",
    articles_title: "記事とガイド",
    articles_sub: "実用的なストレージの知恵。余計な話なし。",
    search_ph: "ガイドを検索...",
    final_title: "何が隠れているか見てみませんか？",
    final_sub: "ベータ期間は無料。2.4MB。クリーンにアンインストール。ユーザーフォルダに管理者権限不要。",
    final_download: "Windows Clean 無料ダウンロード",
    final_email_ph: "you@studio.com",
    final_email_btn: "v1リリース通知",
    footer_note: "オフラインで開発。テレメトリなし。Cookieなし。",
    toast_download: "ダウンロード開始 — Windows-Clean-setup.exe",
    toast_lang: "言語を更新しました",
    min_read: "分で読める",
    read_article: "読む",
    read_case: "スキャンを見る",
  },
};



function ScreenshotFrame({ src, label, annotations, children }: { src: string; label: string; annotations?: { text: string; pos: string }[]; children?: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="rounded-[20px] md:rounded-[28px] bg-white border border-[var(--line)] shadow-[var(--shadow-lg)] overflow-hidden">
        <div className="h-[38px] md:h-[42px] flex items-center justify-between px-4 md:px-5 border-b border-[var(--line)] bg-[#F8F5F0]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF8A65] border border-black/10" />
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFD54F] border border-black/10" />
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#AED581] border border-black/10" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-[11px] font-medium tracking-widest uppercase opacity-60">{label}</span>
            <span className="hidden md:inline-flex w-5 h-5 rounded-full bg-black text-white items-center justify-center text-[10px]">✦</span>
          </div>
          <div className="w-[52px]" />
        </div>
        <div className="relative bg-[#FAF7F3]">
          <img src={src} alt={label} className="w-full h-auto object-contain block" />
          {annotations?.map((a, i) => (
            <div key={i} className={`absolute ${a.pos} hidden md:block`}>
              <div className="px-2.5 py-1 rounded-full bg-[var(--ink)] text-white text-[10px] font-semibold shadow-lg whitespace-nowrap flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {a.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

export type { Lang };
export { dict };
export const LANG_CODES: Lang[] = ["en","de","fr","es","ja"];

export default function App({ initialLang }: { initialLang?: Lang } = {}) {
  const [lang, setLang] = useState<Lang>(() => {
    if (initialLang) return initialLang;
    try {
      const s = localStorage.getItem("wc-lang") as Lang;
      return s && ["en","de","fr","es","ja"].includes(s) ? s : "en";
    } catch { return "en"; }
  });
  const [theme, setTheme] = useState(THEMES[0]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langOpenMobile, setLangOpenMobile] = useState(false);
  const [vizTab, setVizTab] = useState<"sunburst"|"treemap"|"filelist">("treemap");
  const [toast, setToast] = useState<string|null>(null);
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const t = dict[lang];

  useEffect(() => {
    try { localStorage.setItem("wc-lang", lang); } catch {}
    // keep URL, <html lang> and title in sync with the selected language
    try {
      const base = import.meta.env.BASE_URL;
      const path = lang === "en" ? base : `${base}${lang}/`;
      if (window.location.pathname !== path) window.history.replaceState(null, "", path + window.location.hash);
      document.documentElement.lang = lang;
      document.title = SEO[lang].title;
    } catch {}
  }, [lang]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", theme.color);
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ARTICLES.filter(a => !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
  }, [search, lang]);

  const handlePro = () => {
    if (CHECKOUT_URL) window.location.assign(CHECKOUT_URL);
    else setToast(PRO_SOON[lang]);
  };

  const handleDownload = () => {
    setToast(t.toast_download);
    // Same-origin file: the browser saves it directly, the page stays put.
    const a = document.createElement("a");
    a.href = DOWNLOAD_URL;
    a.download = DOWNLOAD_FILE;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div
      data-safe-area-inset-root
      className="min-h-screen w-full bg-[var(--bg)] text-[var(--ink)] overflow-x-clip"
      style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }}
    >
      <header
        data-safe-area-sticky-top
        className="sticky z-40 backdrop-blur-xl bg-[var(--bg)]/90 border-b border-[var(--line)]"
        style={{ top: "var(--safe-area-inset-top)" }}
      >
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 h-[64px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[var(--ink)] text-white flex items-center justify-center font-bold text-[13px] shrink-0">W</div>
            <span className="font-semibold text-[15px] tracking-tight truncate">Windows Clean</span>
            <span className="hidden sm:inline-flex text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full bg-[var(--bg-2)] border border-[var(--line)] shrink-0">BETA 0.1.0</span>
            <div className="hidden md:flex items-center gap-1.5 ml-3">
              {THEMES.map(th => (
                <button
                  key={th.id}
                  onClick={() => setTheme(th)}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${theme.id===th.id ? "border-[var(--ink)] scale-110" : "border-white/60"}`}
                  style={{ background: th.color }}
                  aria-label={th.label}
                />
              ))}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <a href="#dashboard" className="px-3 py-1.5 rounded-full text-[12.5px] font-medium hover:bg-[var(--bg-2)] transition">{t.nav_features}</a>
            <a href="#visualizations" className="px-3 py-1.5 rounded-full text-[12.5px] font-medium hover:bg-[var(--bg-2)] transition">{t.nav_visual}</a>
            <a href="#pricing" className="px-3 py-1.5 rounded-full text-[12.5px] font-medium hover:bg-[var(--bg-2)] transition bg-white border border-[var(--line)]">{t.nav_pricing}</a>
            <a href="#cases" className="px-3 py-1.5 rounded-full text-[12.5px] font-medium hover:bg-[var(--bg-2)] transition">{t.nav_cases}</a>
            <a href="#articles" className="px-3 py-1.5 rounded-full text-[12.5px] font-medium hover:bg-[var(--bg-2)] transition">{t.nav_articles}</a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen(v=>!v)}
                className="h-8 px-3 rounded-full border border-[var(--line)] bg-white text-[12px] font-medium flex items-center gap-1.5 shadow-sm"
              >
                <span>{LANGS.find(l=>l.code===lang)?.flag}</span>
                <span className="uppercase tracking-widest">{LANGS.find(l=>l.code===lang)?.short}</span>
                <span className="text-[10px]">▾</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-[220px] rounded-[16px] bg-white border border-[var(--line)] shadow-[var(--shadow-lg)] p-1.5 z-50">
                  {LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); setToast(`${t.toast_lang}: ${l.label}`); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-left hover:bg-[var(--bg)] transition ${lang===l.code ? "bg-[var(--bg)]" : ""}`}
                    >
                      <span className="text-[16px]">{l.flag}</span>
                      <span className="text-[13px] font-medium">{l.label}</span>
                      {lang===l.code && <span className="ml-auto text-[12px]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={handleDownload} className="hidden md:inline-flex h-8 px-4 rounded-full bg-[var(--ink)] text-white text-[12px] font-semibold hover:opacity-90 transition">{t.getStarted}</button>
            <button onClick={() => setMobileMenu(v=>!v)} className="lg:hidden w-8 h-8 rounded-full bg-white border border-[var(--line)] flex items-center justify-center text-[14px]">{mobileMenu ? "✕" : "☰"}</button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden border-t border-[var(--line)] bg-white px-5 py-5 space-y-4">
            <div className="flex gap-2">
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setToast(`${t.toast_lang}: ${l.label}`); }} className={`h-9 px-3 rounded-full border text-[12px] font-medium flex items-center gap-1 ${lang===l.code ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-[var(--bg)] border-[var(--line)]"}`}>
                  {l.flag} {l.short}
                </button>
              ))}
            </div>
            <div className="grid gap-2 text-[14px] font-medium">
              <a href="#dashboard" onClick={()=>setMobileMenu(false)}>{t.nav_features}</a>
              <a href="#visualizations" onClick={()=>setMobileMenu(false)}>{t.nav_visual}</a>
              <a href="#pricing" onClick={()=>setMobileMenu(false)}>{t.nav_pricing}</a>
              <a href="#cases" onClick={()=>setMobileMenu(false)}>{t.nav_cases}</a>
              <a href="#articles" onClick={()=>setMobileMenu(false)}>{t.nav_articles}</a>
            </div>
            <button onClick={()=>{handleDownload(); setMobileMenu(false);}} className="w-full h-11 rounded-full bg-[var(--ink)] text-white font-semibold text-[13px]">{t.hero_download}</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-5 md:px-7 pt-10 md:pt-16 pb-8 md:pb-14">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--line)] text-[11px] font-medium shadow-sm mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.kicker}
            </div>
            <h1 className="serif text-[40px] md:text-[66px] leading-[0.92] tracking-[-0.03em] font-[400]">
              {t.hero_title.split(" ").slice(0, Math.ceil(t.hero_title.split(" ").length / 2)).join(" ")}<br />
              <span className="italic font-[400] tracking-[-0.03em]">{t.hero_title.split(" ").slice(Math.ceil(t.hero_title.split(" ").length / 2)).join(" ")}</span>
            </h1>
            <div className="mt-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--pill-green)] border border-black/5 text-[12px] font-medium">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">✦</span>
                {t.hero_sub}
              </span>
            </div>
            <p className="mt-5 text-[15px] leading-[1.6] text-[var(--ink-soft)] max-w-[520px]">{t.hero_desc}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button onClick={handleDownload} className="h-11 px-6 rounded-full bg-[var(--ink)] text-white text-[13px] font-semibold shadow-[var(--shadow)] hover:translate-y-[-1px] transition flex items-center gap-2">
                {t.hero_download} <span>↗</span>
              </button>
              <a href="#dashboard" className="h-11 px-5 rounded-full bg-white border border-[var(--line)] text-[13px] font-medium flex items-center shadow-sm hover:shadow transition">{t.hero_how}</a>
            </div>
            <div className="mt-4 text-[11px] text-[var(--ink-faint)]">{t.trust}</div>

            {/* Stats from screenshot */}
            <div className="mt-8 grid grid-cols-4 gap-3 max-w-[520px]">
              {[
                { val: "213 GB", lab: t.stats_scanned },
                { val: "693K", lab: t.stats_files },
                { val: "253K", lab: t.stats_folders },
                { val: "1m 25s", lab: t.stats_time },
              ].map(s => (
                <div key={s.lab} className="rounded-[16px] bg-white border border-[var(--line)] p-3">
                  <div className="text-[16px] md:text-[18px] font-bold tracking-tight leading-none">{s.val}</div>
                  <div className="text-[10px] uppercase tracking-widest font-semibold opacity-60 mt-1">{s.lab}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:sticky md:top-[84px]">
            <ScreenshotFrame src={dashboardImg} label="HOME • SCAN DRIVE • C: 213GB" annotations={[{ text: "C: 99% FULL • 1.46GB FREE", pos: "top-[62%] left-[8%]" }, { text: "RECYCLE BIN 899MB", pos: "top-[78%] right-[8%]" }]} />
            <div className="absolute -left-2 -bottom-4 md:-left-4 md:-bottom-6 bg-white border border-[var(--line)] shadow-[var(--shadow)] rounded-full px-3 py-1.5 text-[11px] font-medium flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[var(--pill-green)] flex items-center justify-center">✓</span> Offline • No cloud • 2.4MB
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD DEEP DIVE */}
      <section id="dashboard" className="border-t border-[var(--line)] bg-white/60">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-3">{t.dashboard_kicker}</div>
              <h2 className="serif text-[32px] md:text-[48px] leading-[0.9] tracking-tight max-w-[560px]">{t.dashboard_title}</h2>
              <p className="mt-4 text-[13px] text-[var(--ink-soft)] max-w-[520px]">{t.dashboard_p1}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium">
              <span className="px-3 py-1 rounded-full bg-white border border-[var(--line)]">Scan Drive</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[var(--line)]">Large Files</span>
              <span className="px-3 py-1 rounded-full bg-white border border-[var(--line)]">Duplicate Finder</span>
              <span className="px-3 py-1 rounded-full bg-[var(--ink)] text-white">Super Power Search</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <ScreenshotFrame src={dashboardImg} label="VOLUMES • WINDOWS STORAGE • REAL DATA" />
            <div className="space-y-4">
              {[
                { t: t.dashboard_b1_t, d: t.dashboard_b1_d, icon: "◫", bg: "#EDE7DF" },
                { t: t.dashboard_b2_t, d: t.dashboard_b2_d, icon: "◧", bg: "#F5E6A0" },
                { t: t.dashboard_b3_t, d: t.dashboard_b3_d, icon: "🛡️", bg: "#C5E49A" },
              ].map((b, i) => (
                <div key={i} className="rounded-[20px] bg-white border border-[var(--line)] p-5 shadow-[var(--shadow)]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] border border-black/5 shrink-0" style={{ background: b.bg }}>{b.icon}</div>
                    <div>
                      <div className="text-[13px] font-semibold tracking-tight">{b.t}</div>
                      <div className="mt-2 text-[13px] leading-[1.6] text-[var(--ink-soft)]">{b.d}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-[12px] bg-white border border-[var(--line)] p-3"><div className="font-semibold">Left Sidebar</div><div className="opacity-60 mt-1 leading-snug">Scan Drive, Large Files, Duplicate Finder, Super Power Search, File Types, Old and Unused</div></div>
                <div className="rounded-[12px] bg-white border border-[var(--line)] p-3"><div className="font-semibold">Volumes</div><div className="opacity-60 mt-1 leading-snug">C: 214GB 99% full, D: 45% — color-coded, instant urgency</div></div>
                <div className="rounded-[12px] bg-white border border-[var(--line)] p-3"><div className="font-semibold">Windows Storage</div><div className="opacity-60 mt-1 leading-snug">Recycle Bin, System Restore, Hiberfil — actionable notes</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUALIZATIONS */}
      <section id="visualizations" className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 py-14 md:py-20">
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-3">{t.viz_kicker}</div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <h2 className="serif text-[32px] md:text-[48px] leading-[0.9] tracking-tight">{t.viz_title}</h2>
            <p className="text-[13px] text-[var(--ink-soft)] max-w-[380px]">{t.viz_sub}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: "treemap", label: t.tab_treemap, sub: "114GB GTA V" },
              { id: "sunburst", label: t.tab_sunburst, sub: "213GB Circle" },
              { id: "filelist", label: t.tab_filelist, sub: "123GB Table" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setVizTab(tab.id as any)}
                className={`h-11 px-5 rounded-full border text-left flex items-center gap-3 transition ${vizTab===tab.id ? "bg-[var(--ink)] text-white border-[var(--ink)] shadow-[var(--shadow)]" : "bg-white border-[var(--line)] hover:bg-[var(--bg-2)]"}`}
              >
                <span className="text-[13px] font-semibold">{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${vizTab===tab.id ? "bg-white/15 text-white/80" : "bg-[var(--bg-2)]"}`}>{tab.sub}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-8 items-start">
            <div className="min-h-[520px]">
              {vizTab === "treemap" && (
                <ScreenshotFrame src={treemapImg} label="TREEMAP • GRAND THEFT AUTO V 114GB • INSTANT DISCOVERY" annotations={[{ text: "GTA V 114GB • PURPLE BLOCK", pos: "top-[22%] left-[14%]" }, { text: "WinSxS 6GB • SYSTEM PROTECTED", pos: "top-[62%] right-[6%]" }, { text: "APPS 65% • OTHER 33%", pos: "bottom-[8%] left-[6%]" }]} />
              )}
              {vizTab === "sunburst" && (
                <ScreenshotFrame src={sunburstImg} label="SUNBURST • LOCAL DISK C: 213GB • 693K FILES" annotations={[{ text: "213GB CIRCLE MAP", pos: "top-[12%] left-[50%] -translate-x-1/2" }, { text: "CLICK TO DRILL DOWN", pos: "bottom-[14%] left-[50%] -translate-x-1/2" }]} />
              )}
              {vizTab === "filelist" && (
                <ScreenshotFrame src={filelistImg} label="FILE LIST • PROGRAM FILES (x86) 123GB • SORTED BY SIZE" annotations={[{ text: "123GB • 28K FILES • 2025/11/25", pos: "top-[18%] left-[6%]" }, { text: "SAFE ACTIONS: OPEN, REVEAL, DELETE TO BIN", pos: "bottom-[10%] right-[6%]" }]} />
              )}
            </div>

            <div className="space-y-5 sticky top-[88px]">
              {vizTab === "treemap" && (
                <>
                  <h3 className="serif text-[26px] md:text-[32px] leading-[0.95] tracking-tight">{t.tree_head}</h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--ink-soft)]">{t.tree_copy}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {t.tree_stats.map(s => <div key={s} className="rounded-[12px] bg-white border border-[var(--line)] px-3 py-2 text-[11px] font-medium">{s}</div>)}
                  </div>
                </>
              )}
              {vizTab === "sunburst" && (
                <>
                  <h3 className="serif text-[26px] md:text-[32px] leading-[0.95] tracking-tight">{t.sun_head}</h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--ink-soft)]">{t.sun_copy}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {t.sun_stats.map(s => <div key={s} className="rounded-[12px] bg-white border border-[var(--line)] px-3 py-2 text-[11px] font-medium">{s}</div>)}
                  </div>
                </>
              )}
              {vizTab === "filelist" && (
                <>
                  <h3 className="serif text-[26px] md:text-[32px] leading-[0.95] tracking-tight">{t.list_head}</h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--ink-soft)]">{t.list_copy}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {t.list_stats.map(s => <div key={s} className="rounded-[12px] bg-white border border-[var(--line)] px-3 py-2 text-[11px] font-medium">{s}</div>)}
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-2">
                <button onClick={()=>setVizTab(vizTab==="treemap"?"sunburst":vizTab==="sunburst"?"filelist":"treemap")} className="h-10 px-5 rounded-full bg-white border border-[var(--line)] text-[12px] font-semibold shadow-sm">Next view →</button>
                <button onClick={handleDownload} className="h-10 px-5 rounded-full bg-[var(--ink)] text-white text-[12px] font-semibold">{t.hero_download}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POWER FEATURES */}
      <section className="border-t border-[var(--line)] bg-[#F2EFE9]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 py-14 md:py-20">
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-3">{t.power_kicker}</div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="serif text-[32px] md:text-[48px] leading-[0.9] tracking-tight max-w-[560px]">{t.power_title}</h2>
            <p className="text-[13px] text-[var(--ink-soft)] max-w-[360px]">{t.power_sub}</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { k: "large", t: t.pf_large_t, d: t.pf_large_d, icon: "◎", color: "#A8CBE6" },
              { k: "dup", t: t.pf_dup_t, d: t.pf_dup_d, icon: "≋", color: "#F5E6A0" },
              { k: "search", t: t.pf_search_t, d: t.pf_search_d, icon: "⌕", color: "#C5E49A", pro: true },
              { k: "types", t: t.pf_types_t, d: t.pf_types_d, icon: "◫", color: "#EDE7DF" },
              { k: "old", t: t.pf_old_t, d: t.pf_old_d, icon: "◷", color: "#E8B4A0" },
              { k: "cleanup", t: t.pf_cleanup_t, d: t.pf_cleanup_d, icon: "✓", color: "#C5E49A" },
              { k: "hist", t: t.pf_hist_t, d: t.pf_hist_d, icon: "⟲", color: "#D8D0E0" },
            ].map(f => (
              <div key={f.k} className="rounded-[20px] bg-white border border-[var(--line)] p-5 shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[16px] border border-black/5" style={{ background: f.color }}>{f.icon}</div>
                  {f.pro && <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full bg-[var(--ink)] text-white">PRO</span>}
                </div>
                <div className="text-[14px] font-semibold tracking-tight">{f.t}</div>
                <div className="mt-2 text-[12.5px] leading-[1.5] text-[var(--ink-soft)]">{f.d}</div>
              </div>
            ))}
            <div className="rounded-[20px] bg-[var(--ink)] text-white p-5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest opacity-60">From screenshots</div>
                <div className="mt-2 text-[15px] font-semibold leading-[1.3]">Left sidebar = real nav</div>
                <div className="mt-2 text-[12px] leading-[1.5] opacity-70">Scan Drive, Large Files, Duplicate Finder, Super Power Search, File Types, Old and Unused, Cleanup, Scan History, Deletion History.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 py-14 md:py-20">
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-3">{t.pricing_kicker}</div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="serif text-[32px] md:text-[48px] leading-[0.9] tracking-tight">{t.pricing_title}</h2>
            <p className="text-[13px] text-[var(--ink-soft)]">{t.pricing_sub}</p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div className="space-y-6">
              <ScreenshotFrame src={pricingImg} label="FREE $0 vs PRO $12.99 • PRICING SCREEN" annotations={[{ text: "FREE • ALWAYS FREE • NAME MATCH", pos: "top-[42%] left-[8%]" }, { text: "PRO $12.99 • PAY ONCE • NO SUB", pos: "top-[42%] right-[8%]" }, { text: "SAFE DELETE • TO RECYCLE BIN", pos: "bottom-[12%] left-[50%] -translate-x-1/2" }]} />

              <div className="rounded-[16px] bg-white border border-[var(--line)] p-4 flex gap-3 text-[12px] leading-[1.5]">
                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">🔒</span>
                <span>{t.pro_trust}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-[24px] bg-white border border-[var(--line)] p-6 shadow-[var(--shadow)]">
                <div className="flex items-baseline justify-between">
                  <div className="text-[14px] font-bold tracking-widest">{t.free_title}</div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-[var(--bg-2)] border border-[var(--line)] font-semibold tracking-widest uppercase">{t.free_sub}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-1"><span className="serif text-[40px] leading-none">{t.free_price}</span><span className="text-[13px] opacity-60">/ forever</span></div>
                <div className="mt-5 space-y-2.5">
                  {t.free_features.map((f,i) => (
                    <div key={i} className="flex gap-2 text-[12.5px] leading-[1.4]"><span className="text-emerald-600">✓</span><span className="text-[var(--ink-soft)]">{f}</span></div>
                  ))}
                </div>
                <button onClick={handleDownload} className="mt-6 w-full h-11 rounded-full bg-white border border-[var(--ink)] text-[13px] font-semibold hover:bg-[var(--bg)] transition">{t.hero_download}</button>
              </div>

              <div className="rounded-[24px] bg-[var(--ink)] text-white p-6 shadow-[var(--shadow-lg)] relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-[200px] h-[200px] rounded-full bg-white/10 blur-[30px]" />
                <div className="flex items-baseline justify-between relative">
                  <div className="text-[14px] font-bold tracking-widest">{t.pro_title}</div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-white text-black font-bold tracking-widest uppercase">{t.pro_sub}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2 relative"><span className="serif text-[40px] leading-none">{t.pro_price}</span><span className="text-[12px] opacity-60">pay once</span><span className="ml-auto px-2 py-1 rounded-full bg-[#C5E49A] text-black text-[10px] font-bold">BEST VALUE</span></div>
                <div className="mt-5 space-y-2.5 relative">
                  {t.pro_features.map((f,i) => (
                    <div key={i} className="flex gap-2 text-[12.5px] leading-[1.4]"><span className="text-[#C5E49A]">✓</span><span className="text-white/80">{f}</span></div>
                  ))}
                </div>
                <button onClick={handlePro} className="mt-6 w-full h-11 rounded-full bg-white text-black text-[13px] font-semibold hover:opacity-90 transition relative">{t.pro_cta}</button>
                <div className="mt-3 text-[11px] text-white/50 text-center relative">One-time purchase. No subscription. No renewals. Offline.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="border-t border-[var(--line)] bg-white/60">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 py-14 md:py-20">
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-3">{t.cases_kicker}</div>
          <h2 className="serif text-[32px] md:text-[44px] leading-[0.9] tracking-tight mb-8">{t.cases_title}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: t.case1_name, metric: t.case1_metric, story: t.case1_story, color: "#E8B4A0", img: treemapImg, label: "Treemap proves 114GB" },
              { name: t.case2_name, metric: t.case2_metric, story: t.case2_story, color: "#A8CBE6", img: sunburstImg, label: "Sunburst 213GB" },
              { name: t.case3_name, metric: t.case3_metric, story: t.case3_story, color: "#C5E49A", img: filelistImg, label: "File List 123GB" },
            ].map(c => (
              <div key={c.name} className="rounded-[24px] bg-white border border-[var(--line)] p-5 shadow-[var(--shadow)] flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold">{c.name}</div>
                  <div className="px-2.5 py-1 rounded-full text-[12px] font-bold border border-black/5" style={{ background: c.color }}>{c.metric}</div>
                </div>
                <div className="mt-4 rounded-[14px] overflow-hidden border border-[var(--line)]">
                  <img src={c.img} alt={c.label} className="w-full h-[140px] object-cover object-top" />
                </div>
                <div className="mt-4 text-[13px] leading-[1.5] text-[var(--ink-soft)] flex-1">{c.story}</div>
                <div className="mt-4 text-[11px] font-semibold tracking-widest uppercase opacity-60">{t.read_case} → {c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section id="articles" className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-60 mb-3">{t.articles_kicker}</div>
              <h2 className="serif text-[32px] md:text-[44px] leading-[0.9] tracking-tight">{t.articles_title}</h2>
              <p className="mt-2 text-[13px] text-[var(--ink-soft)]">{t.articles_sub}</p>
            </div>
            <div className="relative w-full md:w-[260px]">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search_ph} className="w-full h-9 pl-9 pr-3 rounded-full bg-white border border-[var(--line)] text-[13px] outline-none focus:ring-2 focus:ring-black/10" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] opacity-50">⌕</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {filtered.slice(0, 6).map(a => (
              <a key={a.slug} href={`${import.meta.env.BASE_URL}articles/${a.slug}/`} className="rounded-[20px] bg-white border border-[var(--line)] p-5 shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] transition flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--bg-2)] border border-[var(--line)] text-[10px] font-semibold tracking-widest uppercase">{a.category}</span>
                  <span className="text-[11px] text-[var(--ink-faint)]">{a.date} • {a.minutes} {t.min_read}</span>
                </div>
                <h3 className="text-[15px] font-semibold leading-[1.3] tracking-tight line-clamp-2">{a.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.5] text-[var(--ink-soft)] line-clamp-2">{a.description}</p>
                <div className="mt-auto pt-4 text-[11px] font-semibold tracking-widest uppercase opacity-60">{t.read_article} →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1280px] px-5 md:px-7 pb-10">
        <div className="rounded-[28px] bg-[var(--ink)] text-white p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[var(--shadow-lg)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-white/10 blur-[40px]" />
          <div className="relative">
            <h3 className="serif text-[28px] md:text-[36px] leading-[0.95]">{t.final_title}</h3>
            <p className="mt-2 text-[13px] text-white/70 max-w-[460px]">{t.final_sub}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">Offline • Read-only • No upload</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15">2.4MB • Clean uninstall</span>
              <span className="px-2.5 py-1 rounded-full bg-[#C5E49A] text-black font-semibold">213GB in 1m 25s • Real screenshot</span>
            </div>
          </div>
          <div className="w-full md:w-[380px] flex flex-col gap-3 relative">
            <button onClick={handleDownload} className="h-11 px-6 rounded-full bg-white text-black text-[13px] font-semibold hover:opacity-90 transition w-full md:w-auto">{t.final_download}</button>
            <div className="flex gap-2">
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.final_email_ph} className="flex-1 h-11 pl-4 pr-3 rounded-full bg-white/10 border border-white/20 text-[13px] placeholder:text-white/40 outline-none focus:bg-white/15 transition" />
              <button onClick={()=>{ if(!email.includes("@")) { setToast("Valid email required"); return;} setEmail(""); setToast("You're in!");}} className="h-11 px-4 rounded-full bg-white text-black text-[12px] font-semibold shrink-0">{t.final_email_btn}</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] py-8">
        <div className="mx-auto max-w-[1280px] px-5 md:px-7 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[var(--ink-faint)]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--ink)] text-white flex items-center justify-center text-[10px] font-bold">W</div>
            <span>© 2024 Windows Clean • {t.footer_note} • {lang.toUpperCase()} primary</span>
          </div>
          <div className="flex items-center gap-2">
            {LANGS.map(l => (
              <button key={l.code} onClick={()=>{ setLang(l.code); }} className={`w-7 h-7 rounded-full flex items-center justify-center border text-[13px] ${lang===l.code ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-white border-[var(--line)]"}`}>{l.flag}</button>
            ))}
          </div>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] px-4 py-2.5 rounded-full bg-[var(--ink)] text-white text-[12px] font-medium shadow-[var(--shadow-lg)] flex items-center gap-2 max-w-[90vw]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate">{toast}</span>
        </div>
      )}
    </div>
  );
}
