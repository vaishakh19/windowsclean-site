---
title: "Größe und Größe auf Datenträger: Windows erklärt"
description: "Verstehen Sie unterschiedliche Größenangaben in Windows: Zuordnungseinheiten, OneDrive-Platzhalter und harte Links. Prüfen Sie Werte vor dem Löschen."
date: 2026-11-23
category: Storage Tips
---

**Größe bezeichnet die logische Dateilänge; Größe auf Datenträger beschreibt den vom Dateisystem und Werkzeug gemeldeten zugewiesenen Speicher.** Beide Werte müssen nicht übereinstimmen. Zuordnungseinheiten können die Belegung erhöhen, während Kompression, Sparse-Dateien und Cloud-Platzhalter sie verringern können.

Davon zu trennen ist der Vergleich zwischen sichtbaren Ordnersummen und der gesamten Laufwerksbelegung. Berechtigungen, Dateisystemmetadaten und gemeinsam genutzte Daten wirken sich darauf aus. Eine Differenz bedeutet nicht automatisch einen Windows-Fehler oder genauso viel gefahrlos löschbaren Datenmüll.

## Zuerst Gleiches mit Gleichem vergleichen

Klicken Sie eine gewöhnliche lokale Datei rechts an, öffnen Sie **Eigenschaften** und vergleichen Sie **Größe** mit **Größe auf Datenträger**. Beginnen Sie mit einer Datei statt einem Ordner mit Tausenden unterschiedlicher Elemente.

Notieren Sie Pfad, Einheiten und eine mögliche Zugehörigkeit zu OneDrive oder einer virtuellen Maschine. Stellen Sie sicher, dass Explorer und Scanner dasselbe Laufwerk und denselben Umfang untersuchen. Ein Benutzerprofil ist nicht das gesamte Volume C:.

| Beobachtung | Mögliche Erklärung | Was prüfen? |
|---|---|---|
| Belegung etwas größer als Dateilänge | Rundung auf Zuordnungseinheiten | Viele kleine Dateien |
| Logische Größe deutlich größer | Cloud, Kompression oder Sparse-Daten | Status und Speicherart |
| Ordnersummen ungewöhnlich hoch | Geteilte Daten oder verfolgte Verknüpfungen | Zählweise des Werkzeugs |
| Laufwerksbelegung größer als sichtbare Ordner | Geschützte Inhalte oder Metadaten | Zugriffsrechte und Systemspeicher |

Die Tabelle dient der Diagnose, nicht als Löschliste. Für die anschließende Suche nach verständlichen Kandidaten hilft die [Anleitung zum Finden großer Dateien](/articles/find-large-files-windows/).

## Zuordnungseinheiten und kleine Dateien

Dateisysteme vergeben Speicher in Einheiten, oft Cluster genannt. Bei einer normalen, nichtresidenten und unkomprimierten Datei kann eine nur teilweise gefüllte Einheit trotzdem vollständig zugewiesen sein. Viele kleine Dateien können dadurch einen sichtbaren Unterschied zwischen logischer Summe und Belegung erzeugen.

Vereinfacht kann eine 5-KiB-Datei bei 4-KiB-Zuordnungseinheiten 8 KiB belegen. Diese Rechnung gilt nicht pauschal für jede NTFS-Datei: Residente Daten, Kompression und weitere Funktionen schaffen Ausnahmen. Speicher wird also nicht immer bytegenau vergeben.

Eine Änderung der Zuordnungseinheit ist keine gewöhnliche Bereinigung. Sie kann Formatierung oder Datenmigration erfordern. Unternehmen Sie das nicht bloß, um zwei Eigenschaftswerte anzugleichen; klären Sie zunächst, ob überhaupt ein praktisches Kapazitätsproblem besteht.

## OneDrive zeigt auch nicht heruntergeladene Dateien

Eine nur online verfügbare Datei besitzt Namen und logische Größe, obwohl ihr Inhalt nicht vollständig lokal liegt. Microsoft erklärt die [abweichenden OneDrive-Größen](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match).

Beachten Sie die Statusspalte. Eine große Sammlung von Platzhaltern beansprucht nicht zwingend entsprechend viel SSD-Speicher. Das Öffnen kann Downloads auslösen; öffnen Sie deshalb nicht ein ganzes Archiv nur zur Größenprüfung.

Zum Ändern der lokalen Verfügbarkeit ohne Cloud-Löschung lesen Sie [OneDrive-Dateien bei Bedarf](/articles/onedrive-files-on-demand-free-up-space/). Bewerten Sie den Effekt anhand des freien Laufwerksspeichers statt der Annahme, jede logische Dateigröße sei rückgewinnbar.

## Kompression und Sparse-Dateien

Komprimierte Daten können weniger zugewiesene Bytes als ihre unkomprimierte Länge benötigen. Sparse-Dateien stellen leere Bereiche dar, ohne dafür jedes Byte physisch zu speichern. Die [Microsoft-Dokumentation zu Sparse-Dateien](https://learn.microsoft.com/en-us/windows/win32/fileio/sparse-files) beschreibt diesen Unterschied.

Virtuelle Festplatten können außerdem eine Kapazität melden, die von ihrer aktuellen Hostbelegung abweicht. Gehört eine Datei zu WSL oder Docker, verwenden Sie die zuständigen Werkzeuge und [vergleichen Sie beide Speicherebenen](/articles/docker-wsl-disk-space-windows/).

Konvertieren oder komprimieren Sie keinen aktiven Anwendungsdatenträger, nur um eine Zahl zu senken. Das Programm kann besondere Anforderungen haben. Die richtige Vorgehensweise hängt vom Dateityp und davon ab, ob er gerade verwendet wird.

## Harte Links können Ordnersummen verzerren

Ein harter Link ermöglicht mehrere Dateinamen für dieselben zugrunde liegenden Daten. Ein Werkzeug, das die logische Größe jedes Pfads summiert, kann diese Daten mehrfach zählen. Ein anderes erkennt die gemeinsame Dateiidentität und kommt auf einen abweichenden Wert.

Das ist besonders beim Windows-Komponentenspeicher relevant. Die [WinSxS-Erklärung](/articles/why-is-winsxs-so-big/) zeigt, warum seine scheinbare Größe kein direktes Bereinigungsziel ist. Microsoft beschreibt harte Links auch in der [NTFS-Übersicht](https://learn.microsoft.com/en-us/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems).

Zwei Namen sind nicht automatisch zwei unabhängig entfernbaren Kopien gleichzusetzen. Verwechseln Sie systemseitige harte Links nicht mit normalen doppelten Dokumenten. Das Entfernen eines Pfads muss nicht die daneben angezeigte logische Größe freigeben.

## Ein Scanner sieht nicht immer alles

Die Laufwerkseigenschaften umfassen Belegung, die ein gewöhnlicher Ordnerscan möglicherweise nicht vollständig erfassen kann. Zugriffsbeschränkungen, Wiederherstellungsdaten und Metadaten erklären einen Teil der Abweichung. Lesen Sie über [Wiederherstellungspunkte und Speicherplatz](/articles/system-restore-points-disk-space/), bevor Sie geschützte Ordner untersuchen.

Windows Clean zeigt zugängliche Dateien kostenlos und offline als Sunburst, Treemap oder Dateiliste, ohne Konto und Administratorrechte. Nutzen Sie diese Ansichten für erkennbare persönliche Inhalte, berücksichtigen Sie jedoch fehlende geschützte Bereiche. Ändern Sie keine Systemberechtigungen, nur um ein Diagramm an den Explorer anzugleichen.

## Häufig gestellte Fragen

### Welche Zahl zeigt sicher löschbaren Speicher?

Keine der beiden bestimmt die Sicherheit. Klären Sie Zweck und Eigentümer der Datei. Messen Sie eine bewusst gewählte Bereinigung anhand des freien Speichers vorher und nachher.

### Warum ist Größe auf Datenträger bei OneDrive kleiner?

Onlinedateien können ihre logische Länge anzeigen, während der Inhalt in der Cloud bleibt. Prüfen Sie den Status; die sichtbare Größe ist nicht unbedingt lokaler Verbrauch.

### Warum melden zwei Scanner unterschiedliche Summen?

Sie können andere Rechte besitzen, logische statt zugewiesene Bytes zählen oder Links unterschiedlich behandeln. Vergleichen Sie Umfang und Zählmethode, bevor Sie einen Fehler vermuten.
