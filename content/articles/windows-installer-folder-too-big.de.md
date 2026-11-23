---
title: "Windows-Installer-Ordner zu groß: sicher vorgehen"
description: "Erfahren Sie, warum C:\Windows\Installer wächst, weshalb MSI- und MSP-Dateien wichtig sind und welche unterstützten Wege Speicher freigeben."
date: 2026-11-23
category: Windows Storage
---

**Ist der Windows-Installer-Ordner zu groß, löschen Sie seine MSI- und MSP-Dateien nicht von Hand.** `C:\Windows\Installer` enthält Installationsmaterial, das Programme später benötigen können. Ein alter Zeitstempel oder ein unverständlicher Dateiname beweist nicht, dass der Inhalt ungenutzt ist.

Entscheidend ist, welches Programm den Speicher beansprucht und welche unterstützte Wartung infrage kommt. Prüfen Sie den genauen Pfad und die installierten Anwendungen. Dieser Artikel behandelt den Installer-Cache; [Windows-Update-Dateien](/articles/clean-windows-update-files/) und [WinSxS](/articles/why-is-winsxs-so-big/) gehören zu anderen Wartungsaufgaben.

## Was im Installer-Ordner liegt

Programme, die Windows Installer verwenden, können Pakete und Patches für spätere Wartung aufbewahren. Dieser Cache ist nicht mit einer heruntergeladenen Setup-Datei im Downloads-Ordner gleichzusetzen. Eine überflüssige Downloadkopie zu entfernen hat andere Folgen als das Löschen interner Wartungsdateien.

Microsoft warnt in der [Dokumentation zu fehlenden Cache-Dateien](https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/missing-windows-installer-cache), dass Schäden erst beim Reparieren, Aktualisieren oder Deinstallieren sichtbar werden können. Ein Programm, das heute noch startet, ist deshalb kein Beleg für einen entbehrlichen Cache.

Der Ordner kann Daten mehrerer Produkte und Updates enthalten. Es gibt weder eine allgemeingültige Normalgröße noch eine sichere Altersgrenze für Dateien. Auch ein älteres, weiterhin genutztes Programm kann seine ursprünglichen Wartungsdateien benötigen.

## Zuerst den genauen Speicherort bestätigen

Ähnlich benannte Ordner haben unterschiedliche Aufgaben:

| Speicherort | Typischer Zweck | Passender Ausgangspunkt |
|---|---|---|
| `C:\Windows\Installer` | Installationscache von Anwendungen | Wartung der Anwendung |
| `C:\Windows\WinSxS` | Windows-Komponentenspeicher | Unterstützte Windows-Bereinigung |
| Downloads | Selbst heruntergeladene Dateien | Persönliche Dateien prüfen |
| Anwendungseigener Cache | Produktspezifische Arbeitsdaten | Programmeinstellungen oder Dokumentation |

Notieren Sie Pfad und ungefähre Größe. Ändern Sie bei verweigertem Zugriff nicht einfach Besitzer oder Berechtigungen, damit ein Bereinigungsprogramm hineingelangt. Ein Scan ohne Administratorrechte kann geschützte Bereiche auslassen und damit keine vollständige Bilanz des Systems liefern.

## Installierte Anwendungen überprüfen

Öffnen Sie unter Windows 11 **Start > Einstellungen > Apps > Installierte Apps**. Unter Windows 10 lautet der Weg **Einstellungen > Apps > Apps & Features**. Suchen Sie bekannte Programme, die Sie nicht mehr benötigen, sowie alte Versionen neben neueren Installationen.

Sichern Sie vor einer Deinstallation Projektdateien und benötigte Lizenzinformationen oder Installationsmedien. Schließen Sie das Programm, öffnen Sie dessen Menü und wählen Sie **Deinstallieren**. Manche Desktopprogramme verwenden stattdessen **Systemsteuerung > Programme > Programme und Features**.

Das sind von Microsoft beschriebene [Deinstallationswege](https://support.microsoft.com/en-us/windows/apps/uninstall-or-remove-apps-and-programs-in-windows). Dabei verwaltet der Installer seine eigenen Ressourcen. Der Cache muss anschließend nicht exakt um die angezeigte Programmgröße schrumpfen: Gemeinsam verwendete Komponenten und Produktbesonderheiten können eine Rolle spielen.

## Was bedeutet $PatchCache$?

Manche Anleitungen empfehlen, `C:\Windows\Installer\$PatchCache$` zu löschen oder eine Registrierungsrichtlinie zu ändern. Dabei geht es um das Wartungsverhalten des Installers, nicht um einen gewöhnlichen temporären Ordner.

Microsoft dokumentiert die Richtlinie [MaxPatchCacheSize](https://learn.microsoft.com/en-us/windows/win32/msi/maxpatchcachesize) für ältere Dateiversionen beim Anwenden von Patches. Ein dokumentierter Einstellwert ist jedoch keine pauschale Freigabe zum Löschen vorhandener Cache-Ordner. Anforderungen des Produkts und verfügbare Installationsquellen bleiben relevant.

Fragen Sie bei verwalteten Rechnern die Administration oder den Softwarehersteller nach einem unterstützten Verfahren. Vermeiden Sie allgemeine Skripte für angeblich verwaiste MSI-Dateien, solange die konkreten Dateien nicht als entbehrlich bestätigt sind. Eine Massenlöschung wird hier bewusst nicht vorgeschlagen.

## Bei akutem Platzmangel anderswo beginnen

Lassen Sie Installer unverändert und prüfen Sie nachvollziehbare Kategorien. Öffnen Sie **Einstellungen > System > Speicher > Temporäre Dateien** und lesen Sie jede Auswahl. Downloads kann wichtige persönliche Dateien enthalten und sollte nicht automatisch markiert werden.

Untersuchen Sie danach [große persönliche Dateien](/articles/find-large-files-windows/), etwa Videos, Archive und alte Exporte. Verschieben Sie weiterhin benötigte Inhalte auf ein anderes Laufwerk. Die [Anleitung für temporäre Dateien](/articles/delete-temporary-files-windows/) erklärt den Unterschied zwischen vorgesehenen Werkzeugen und willkürlichem Löschen.

Windows Clean untersucht zugängliche Dateien kostenlos und offline als Sunburst, Treemap oder Liste, ohne Konto und Administratorrechte. Verwenden Sie die Ansichten zur Orientierung. Ein großes Rechteck beweist nicht, dass eine Systemdatei gefahrlos gelöscht werden kann, und ersetzt nicht den Anwendungsinstaller.

## Wenn Cache-Dateien bereits fehlen

Beenden Sie weitere Löschungen. Dokumentieren Sie betroffenes Produkt, Fehlermeldung und entfernte Dateien. Fragen Sie den Hersteller nach einer passenden Wiederherstellung. Kopieren Sie nicht ähnlich benannte Dateien von einem anderen PC in der Annahme, sie passten zur Installation.

Microsoft bietet [Hilfe bei Installations- und Deinstallationsproblemen](https://support.microsoft.com/en-us/windows/deployment/install-upgrade/fix-problems-that-block-programs-from-being-installed-or-removed). Die Lösung hängt vom Produkt und den fehlenden Bestandteilen ab; ein erneuter Programmstart genügt nicht in jedem Fall.

## Häufig gestellte Fragen

### Kann ich alte MSI- und MSP-Dateien entfernen?

Nicht allein aufgrund von Alter oder Namen. Sie können weiterhin für Updates, Reparaturen oder Deinstallationen gebraucht werden. Nutzen Sie die unterstützte Produktwartung.

### Leert die Datenträgerbereinigung den Installer-Cache?

Darauf sollten Sie nicht zählen. Verwenden Sie die ausdrücklich angebotenen Windows-Kategorien und überlassen Sie Wartungsdateien dem jeweiligen Installer.

### Bedeutet ein großer Installer-Ordner Schadsoftware?

Die Größe allein erlaubt keine solche Diagnose. Identifizieren Sie Produkte und Speicherorte. Bei einem unabhängigen Verdacht verwenden Sie Ihre Sicherheitswerkzeuge statt einer Cache-Löschung.
