---
title: "Chrome- und Edge-Cache unter Windows sicher leeren"
description: "Leeren Sie den Cache von Chrome und Edge, ohne Passwörter oder Downloads zu löschen. Prüfen Sie die Auswahl und den tatsächlich gewonnenen Speicher."
date: 2026-11-23
category: Storage Tips
---

**Öffnen Sie zum Leeren des Chrome- oder Edge-Caches die Löschoptionen für Browserdaten und wählen Sie Bilder und Dateien im Cache.** Lassen Sie andere Kategorien abgewählt, wenn Sie sie behalten möchten. Cache, Cookies, Passwörter und heruntergeladene Dateien sind nicht dasselbe.

Die Bereinigung kann Speicher zurückgewinnen und manche Ladeprobleme beheben. Sie garantiert weder eine bestimmte Gigabyte-Zahl noch schnellere Webseiten. Bei einer fast vollen Festplatte sollten Sie zunächst vergleichen, ob der Browser überhaupt zu den größten Verbrauchern gehört.

## Was die einzelnen Kategorien bedeuten

| Kategorie | Entfernte Daten | Bedeutung für den Speicher |
|---|---|---|
| Bilder und Dateien im Cache | Wiederverwendbare Webinhalte | Der Cache wächst beim Surfen erneut |
| Cookies und andere Websitedaten | Sitzungen und gespeicherte Webdaten | Abmeldungen oder verlorene Offline-Inhalte möglich |
| Browserverlauf | Aufzeichnungen besuchter Seiten | Nicht mit Seitenressourcen gleichzusetzen |
| Downloadverlauf | Liste der Downloads | Die heruntergeladenen Dateien bleiben bestehen |
| Passwortoptionen | Gespeicherte Anmeldedaten, falls angeboten | Für reine Cache-Bereinigung nicht nötig |

Google beschreibt die Kategorien in der [Dokumentation zu Browserdaten](https://support.google.com/chrome/answer/2392709?hl=en&co=GENIE.Platform%3DDesktop). Behandeln Sie jedes Häkchen als eigene Entscheidung. Wählen Sie nicht alles aus, nur weil es bequem möglich ist.

## Den Cache in Chrome leeren

1. Öffnen Sie das Chrome-Profil, dessen Speicher Sie bereinigen möchten.
2. Wählen Sie im Dreipunktmenü **Browserdaten löschen**.
3. Stellen Sie den Zeitraum ein. **Gesamte Zeit** umfasst den verfügbaren Gesamtzeitraum; ein kürzerer eignet sich für neue Probleme.
4. Wählen Sie **Bilder und Dateien im Cache** und kontrollieren Sie die übrigen Kategorien.
5. Bestätigen Sie mit **Daten löschen** und warten Sie auf den Abschluss.

Bezeichnungen und Anordnung ändern sich mit Versionen. Suchen Sie notfalls in den Chrome-Einstellungen nach Browserdaten. Die [Hilfe zu Cache und Cookies](https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop) behandelt beide Themen; daraus folgt nicht, dass Sie auch Cookies löschen müssen.

Speichern Sie vorher offene Arbeit in Webanwendungen. Rufen Sie anschließend eine bekannte Seite auf und prüfen Sie die Funktion. Der erste Aufruf kann langsamer sein, weil Bilder und andere Ressourcen erneut geladen werden.

## Den Cache in Microsoft Edge leeren

Drücken Sie in Edge **Ctrl + Shift + Delete**; auf einer deutschen Tastatur entspricht dies **Strg + Umschalt + Entf**. Microsoft führt die Kombination in seiner [Tastenkürzel-Referenz](https://support.microsoft.com/en-us/edge/keyboard-shortcuts-in-microsoft-edge) auf.

Wählen Sie Zeitraum und **Zwischengespeicherte Bilder und Dateien**. Kontrollieren Sie alle anderen Häkchen, bevor Sie **Jetzt löschen** oder die entsprechende Schaltfläche verwenden. Der Einstellungsweg führt über **Einstellungen > Datenschutz, Suche und Dienste** zu den Browserdaten. Die genaue Beschriftung hängt von der Version ab.

Die [Microsoft-Anleitung zu Cookies](https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use) erläutert deren zusätzliche Löschfolgen. Geht es nur um gespeicherte Seitenressourcen, lassen Sie Cookies und Websitedaten ohne konkreten Grund unangetastet.

## Das richtige Profil untersuchen

Private und geschäftliche Profile können eigene Datenordner besitzen. Die Bereinigung eines Profils erfasst nicht automatisch alle anderen. Öffnen Sie jedes Profil bewusst und beachten Sie Vorgaben für verwaltete Arbeitsprofile.

Löschen Sie nicht den gesamten Ordner `User Data` von Chrome oder Edge. Darin liegt wesentlich mehr als Cache. Erweiterungen und Websites können zudem Daten außerhalb der gelöschten Kategorie speichern. Ein weiterhin großer Profilordner beweist deshalb keinen Fehler beim Bereinigen.

Der [AppData-Leitfaden](/articles/appdata-using-space/) erklärt die umgebende Ordnerstruktur. Speichert eine Website eine große Offline-Bibliothek, prüfen Sie deren eigene Speicherfunktionen. Stellen Sie vor dem Entfernen von Websitedaten sicher, dass wichtige Arbeit wiederherstellbar ist.

## Die Ersparnis tatsächlich messen

Öffnen Sie unter **Datei-Explorer > Dieser PC** die **Eigenschaften** des betroffenen Laufwerks. Notieren Sie den freien Speicher vorher und nachher. Schließen Sie unnötige Tabs: Downloads, Updates und andere Programme können den Wert gleichzeitig verändern.

Windows Clean bietet kostenlose Offline-Scans zugänglicher Dateien mit Sunburst, Treemap und Dateiliste, ohne Konto und Administratorrechte. Damit erkennen Sie, ob der Browser wirklich viel Platz beansprucht. Das ersetzt nicht seine profilspezifischen Bereinigungsfunktionen.

Liegt der Hauptverbrauch in Downloads, löst Cache-Leeren dieses Problem nicht. [Prüfen Sie alte Downloads](/articles/delete-old-downloads-windows/) getrennt. Für von Windows verwaltete temporäre Daten hilft die [Anleitung zur temporären Bereinigung](/articles/delete-temporary-files-windows/).

## Nicht unnötig täglich leeren

Ein Cache verhindert, dass dieselben Ressourcen bei jedem Besuch erneut heruntergeladen werden. Tägliches Leeren kann Datenverkehr erhöhen und erste Seitenaufrufe verlangsamen, ohne die Ursache einer vollen SSD zu beseitigen.

Bereinigen Sie bei einem gemessenen Speicherproblem oder zur gezielten Fehlersuche. Sinkt der freie Speicher schnell erneut, finden Sie den tatsächlich wachsenden Ordner. Behalten Sie nützliche Offline-Daten und konzentrieren Sie sich auf die verantwortliche Kategorie.

## Häufig gestellte Fragen

### Werden beim Cache-Leeren Passwörter gelöscht?

Die Cache-Kategorie ist von Anmeldedaten getrennt. Kontrollieren Sie alle Häkchen und wählen Sie Passwortdaten sowie andere gewünschte Inhalte ab. Setzen Sie nicht das ganze Profil zurück.

### Entfernt der Downloadverlauf die gespeicherten Dateien?

Nein. Die Löschung betrifft die Browserliste, nicht die Dateien im Downloads-Ordner. Prüfen Sie diese separat, bevor Sie etwas entfernen.

### Warum wächst der Cache wieder?

Beim Surfen werden wiederverwendbare Ressourcen gespeichert. Das ist normal. Bei ungewöhnlichem Wachstum unterscheiden Sie Cache, Erweiterungen, Websitedaten und tatsächliche Downloads.
