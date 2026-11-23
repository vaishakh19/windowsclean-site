---
title: "OneDrive: Speicherplatz mit Dateien bei Bedarf sparen"
description: "Geben Sie mit OneDrive lokalen Speicher frei, ohne Cloud-Dateien zu löschen. Prüfen Sie Statussymbole, Synchronisierung und den Zugriff ohne Internet."
date: 2026-11-23
category: Windows Storage
---

**Um mit OneDrive lokalen Speicher freizugeben, klicken Sie mit der rechten Maustaste auf eine synchronisierte Datei und wählen Speicherplatz freigeben. Wählen Sie nicht Löschen.** Der Inhalt kann anschließend nur noch in der Cloud liegen, während der Dateiname im Explorer sichtbar bleibt. Zum erneuten Öffnen benötigen Sie eine Internetverbindung.

Das hilft etwa, wenn Dokumente oder Bilder einen Laptop füllen. Prüfen Sie zuerst, welche Inhalte heruntergeladen sind und welche Sie unterwegs brauchen. Ist OneDrive noch nicht als Ursache bestätigt, beginnen Sie mit der [Suche nach großen Dateien](/articles/find-large-files-windows/).

## Die drei OneDrive-Zustände verstehen

Öffnen Sie den OneDrive-Ordner im Explorer und beachten Sie die Spalte Status. Microsoft beschreibt die Zustände in seiner [Dokumentation zu Dateien bei Bedarf](https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows).

| Symbol | Bedeutung | Geeignet für |
|---|---|---|
| Blaue Wolke | Nur online; Inhalt wird beim Öffnen geladen | Selten benötigte Archive |
| Grüner Haken mit Kreisumriss | Heruntergeladen und lokal verfügbar | Kürzlich geöffnete Dateien |
| Ausgefüllter grüner Kreis mit weißem Haken | Bleibt auf diesem Gerät verfügbar | Arbeit ohne Internet |

Ein sichtbarer Name beweist nicht, dass die vollständige Datei auf der SSD liegt. Umgekehrt lädt das Öffnen einer Onlinedatei ihren Inhalt herunter. Wählen Sie den Zustand nach Ihrem Bedarf, statt sofort die gesamte Sammlung auf nur online umzustellen.

## Erst die Synchronisierung prüfen

Klicken Sie im Infobereich auf das OneDrive-Symbol. Beheben Sie pausierte Synchronisierung, Anmeldefehler und ausstehende Uploads, bevor Sie die Verfügbarkeit verändern. Öffnen Sie wichtige Dokumente bei Bedarf auf der OneDrive-Webseite und prüfen Sie, ob dort die erwartete Version liegt.

Schließen Sie Programme, die die betreffenden Dateien verwenden. Beginnen Sie mit einem Archivordner, nicht mit einem laufenden Projekt. Alte Videoexporte können geeignet sein; die Präsentation für morgen und ihre verknüpften Medien sollten auf Reisen verfügbar bleiben.

Synchronisierung ersetzt keine unabhängige Sicherung. Änderungen und Löschungen können auf andere Geräte übertragen werden. Bewahren Sie für unersetzliche Arbeit eine weitere Kopie auf, besonders vor größeren Umorganisationen.

## Einen Ordner nur online verfügbar machen

1. Drücken Sie **Win + E** und öffnen Sie den richtigen OneDrive-Ordner.
2. Markieren Sie eine vollständig synchronisierte Datei oder einen Ordner, den Sie nicht offline benötigen.
3. Klicken Sie rechts und wählen Sie **Speicherplatz freigeben**.
4. Warten Sie auf den Abschluss und prüfen Sie das Wolkensymbol.
5. Öffnen Sie unter **Dieser PC** die **Eigenschaften** des Laufwerks und vergleichen Sie den freien Speicher.

Testen Sie zunächst eine kleine Auswahl. Wenn Sie die Dateien sofort wieder öffnen, werden sie erneut heruntergeladen. Nutzen Sie zur Kontrolle der Cloud-Kopie besser die Webseite. Die tatsächliche Ersparnis hängt von bereits lokalen Inhalten und anderen laufenden Aktivitäten ab.

Fehlt der Befehl, prüfen Sie, ob das ausgewählte Element wirklich im synchronisierten Ordner liegt. Unter **OneDrive-Einstellungen > Synchronisieren und sichern > Erweiterte Einstellungen** finden sich je nach Version die Optionen für Dateien bei Bedarf. Unternehmensrichtlinien können die verfügbaren Funktionen einschränken.

## Wichtige Arbeit offline behalten

Wählen Sie für benötigte Dateien **Immer auf diesem Gerät behalten**. Warten Sie vor dem Verlassen einer zuverlässigen Verbindung, bis alle Downloads abgeschlossen sind und der ausgefüllte grüne Kreis erscheint.

Markieren Sie nicht versehentlich einen sehr großen übergeordneten Ordner. Dadurch können dessen Inhalte heruntergeladen werden und die gewünschte Ersparnis aufheben. Ein kleiner lokaler Arbeitsordner neben einem größeren Onlinearchiv lässt sich leichter kontrollieren.

Microsoft erklärt außerdem das [Zusammenspiel mit der Speicheroptimierung](https://support.microsoft.com/en-us/onedrive/use-onedrive-and-storage-sense-in-windows-10-to-manage-disk-space). Prüfen Sie die Einstellungen für Cloud-Inhalte, bevor Sie automatische Änderungen aktivieren. Mehr zu Windows-Werkzeugen steht im [Vergleich von Speicheroptimierung und Datenträgerbereinigung](/articles/storage-sense-vs-disk-cleanup/).

## Freigeben ist nicht dasselbe wie Löschen

Eine Löschung im synchronisierten Ordner kann die Datei auch aus OneDrive und von anderen Geräten entfernen. Speicherplatz freigeben verändert dagegen die lokale Verfügbarkeit. Verwenden Sie nicht den Papierkorb, wenn Sie nur den Download entfernen und die Cloud-Kopie behalten möchten.

Die Aktion reduziert auch nicht den belegten Speicher Ihres OneDrive-Kontos. Ein volles Cloud-Kontingent ist ein anderes Problem. Microsoft erläutert die Unterschiede in der [Anleitung zum Löschen von OneDrive-Dateien](https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive).

## Die lokale Belegung richtig messen

Platzhalter können dazu führen, dass **Größe** deutlich über **Größe auf Datenträger** liegt. Microsoft beschreibt diese [Größenunterschiede bei OneDrive](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match). Vergleichen Sie freien Laufwerksspeicher, statt jede angezeigte Ordnergröße als lokal rückgewinnbar anzusehen.

Windows Clean zeigt zugängliche Ordner als Sunburst, Treemap oder Dateiliste. Der Scan ist kostenlos, funktioniert offline und benötigt weder Konto noch Administratorrechte. Er verändert keine OneDrive-Verfügbarkeit; nutzen Sie dafür OneDrive selbst. Für andere große persönliche Dateien kommt auch das [Verschieben auf ein anderes Laufwerk](/articles/move-files-to-another-drive-windows/) infrage.

## Häufig gestellte Fragen

### Löscht Speicherplatz freigeben meine OneDrive-Dateien?

Der Befehl macht synchronisierte Inhalte auf diesem PC nur online verfügbar. Prüfen Sie vorher, ob die Synchronisierung abgeschlossen ist und wichtige Cloud-Kopien vorhanden sind.

### Warum benötigen die Dateien später wieder Speicher?

Das Öffnen einer Onlinedatei lädt sie herunter. Auch Immer auf diesem Gerät behalten löst Downloads aus. Kontrollieren Sie Dateistatus und übergeordneten Ordner.

### Lassen sich Onlinedateien ohne Internet öffnen?

Nein. Laden Sie benötigte Inhalte vorher herunter und behalten Sie wichtige Arbeit lokal. Warten Sie auf den vollständigen Download, bevor Sie die Verbindung trennen.
