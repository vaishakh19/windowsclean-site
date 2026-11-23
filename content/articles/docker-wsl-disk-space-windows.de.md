---
title: "Docker und WSL: Speicher unter Windows bereinigen"
description: "Prüfen Sie den Speicher von Docker und WSL, Images und Volumes. Erfahren Sie, warum gelöschte Linux-Dateien eine VHDX nicht immer verkleinern."
date: 2026-11-23
category: Storage Tips
---

**Docker und WSL haben zwei Speicherebenen: Daten innerhalb von Linux und die virtuelle Festplattendatei unter Windows.** Entfernte Images oder Linux-Dateien können intern Platz freigeben, ohne sofort C: zu entlasten. Das Löschen der VHDX selbst kann die gesamte Umgebung zerstören.

Beginnen Sie mit Messungen ohne Änderungen. Klären Sie, ob Docker, eine persönliche WSL-Distribution oder normale Windows-Dateien wachsen. Ist der Speicherort unklar, [suchen Sie große Dateien](/articles/find-large-files-windows/) und notieren Sie deren vollständige Pfade.

## Den Eigentümer des Speichers ermitteln

Listen Sie in PowerShell die Distributionen auf:

```powershell
wsl --list --verbose
```

Die Ausgabe zeigt installierte Distributionen und ihre WSL-Version. WSL 2 arbeitet mit virtuellen Festplatten; WSL 1 verwendet eine andere Speicherarchitektur. Docker Desktop hängt zusätzlich von Backend, Version und Installationshistorie ab. Eine Distribution namens `docker-desktop-data` ist deshalb nicht überall vorauszusetzen.

Microsoft erklärt im [Leitfaden zum WSL-Speicher](https://learn.microsoft.com/en-us/windows/wsl/vhd-size) die virtuelle Kapazität und das Auffinden der VHDX. Die [Docker-Dokumentation für Windows](https://docs.docker.com/desktop/features/wsl/) beschreibt die Integration. Verwenden Sie Hinweise für Ihre konkrete Installation statt eines alten Forumspfads.

## Docker zunächst nur untersuchen

Starten Sie Docker Desktop und führen Sie aus:

```powershell
docker system df
docker system df -v
docker container ls -a
docker image ls
docker volume ls
```

Diese Befehle zeigen Informationen an. Die [Referenz zur Festplattenbelegung](https://docs.docker.com/reference/cli/docker/system/df/) erläutert die Zusammenfassung und Details. Unterscheiden Sie Images, gestoppte Container, Build-Cache und Volumes. Technisch rückgewinnbarer Speicher ist nicht automatisch wertloser Inhalt.

Ein gestoppter Container kann zu einem Projekt gehören, das Sie später fortsetzen. Ein nicht zugeordnetes Volume kann die einzige Kopie einer Entwicklungsdatenbank enthalten. Bestimmen Sie Projekt und Zweck jeder Ressource und sichern Sie persistente Daten vor einer Löschung.

## Gezielt statt pauschal aufräumen

Erkennen Sie ein veraltetes Image oder einen nicht mehr benötigten gestoppten Container, prüfen Sie die Details in Docker Desktop und entfernen Sie nur diesen Eintrag. Für nicht referenzierte Images ohne Tag bietet Docker:

```powershell
docker image prune
```

Dieser Befehl löscht Daten. Lesen Sie die Bestätigung und brechen Sie bei unklarem Umfang ab. Obwohl er enger gefasst ist als das Löschen aller ungenutzten Images, sollten Sie wissen, was erneut gebaut oder heruntergeladen werden kann.

`docker system prune` entfernt zusätzlich gestoppte Container, ungenutzte Netzwerke und ungenutzten Build-Cache. Verwenden Sie ihn nicht als unerklärten Standardtipp. Optionen wie `--all` und `--volumes` erweitern den Umfang. Der [Docker-Leitfaden zur Bereinigung](https://docs.docker.com/engine/manage-resources/pruning/) beschreibt die Unterschiede. Lassen Sie Rückfragen aktiviert.

## Persönliche WSL-Distribution separat prüfen

Öffnen Sie die betreffende Distribution und geben Sie ein:

```bash
df -h /
du -h --max-depth=1 ~ 2>/dev/null
```

Der erste Befehl zeigt die Dateisystembelegung. Der zweite fasst Ihr Home-Verzeichnis zusammen, nicht das gesamte Linux-System. Er kann alte Build-Ausgaben, Datensätze oder Caches sichtbar machen. Große Inhalte außerhalb dieses Verzeichnisses müssen gesondert untersucht werden.

Entfernen Sie nur bekannte Inhalte, möglichst mit dem zugehörigen Programm oder Paketmanager. Eine Löschung in der Linux-Shell landet normalerweise nicht im Windows-Papierkorb. Verwenden Sie `wsl --unregister` nicht als Bereinigungstrick: Damit werden Distribution und Daten entfernt.

## Warum die VHDX groß bleiben kann

Eine dynamisch wachsende virtuelle Festplatte kann ihre Zuweisung auf dem Host behalten, obwohl intern Dateien entfernt wurden. Maximale Kapazität, von Linux gemeldete Nutzung und physische Dateibelegung unter Windows beantworten verschiedene Fragen. Große virtuelle Kapazität bedeutet nicht unbedingt gleich große SSD-Belegung.

Vergleichen Sie nach der Bereinigung freien Windows-Speicher und interne Werte. Bleibt der Host knapp, lesen Sie die aktuellen Hinweise zur Rückgewinnung oder Komprimierung für Ihr Backend. Das Verkleinern der virtuellen Datei ist eine eigene Wartungsaufgabe und kein Anlass, sie zu löschen oder umzubenennen.

Speichern Sie Arbeit, sichern Sie wichtige Daten und stoppen Sie betroffene Prozesse vor einer solchen Wartung. `wsl --shutdown` beendet laufende WSL-Umgebungen; verwenden Sie es nicht während aktiver Aufgaben. Kopieren Sie auch keine Wartungsbefehle, die auf einen nur vermuteten VHD-Pfad zeigen.

## Künftiges Wachstum kontrollieren

Führen Sie eine kurze Übersicht über Projekte, persistente Volumes und entbehrliche Build-Ergebnisse. Prüfen Sie alte Projekte vor dem Entfernen gemeinsamer Ressourcen. Zum Umziehen einer Umgebung verwenden Sie unterstützte Import-, Export- oder Programmeinstellungen statt die Festplattendatei im Explorer zu verschieben.

Für normale Windows-Ordner helfen die Artikel zu [AppData](/articles/appdata-folder-too-big/) und zum [Verschieben auf andere Laufwerke](/articles/move-files-to-another-drive-windows/). Windows Clean findet große zugängliche Hostdateien mit einem kostenlosen Offline-Scan, ohne Konto oder Administratorrechte. Es untersucht nicht das Linux-Dateisystem innerhalb einer VHDX und verkleinert keinen Docker-Speicher. Dafür sind die zuständigen Werkzeuge gedacht.

## Häufig gestellte Fragen

### Darf ich ext4.vhdx löschen?

Nicht, wenn Sie die Distribution behalten möchten. Die Datei enthält ihr Linux-Dateisystem. Ermitteln Sie den Eigentümer und verwenden Sie nach einer Sicherung ein unterstütztes Verfahren.

### Warum sinkt docker system df, aber C: bleibt voll?

Interne Nutzung und Hostzuweisung sind unterschiedliche Messungen. Die virtuelle Festplatte kann zugewiesenen Speicher behalten; die Rückgewinnung hängt vom Backend ab.

### Ist ein ungenutztes Volume sicher löschbar?

Nicht automatisch. Es kann Daten eines gestoppten oder entfernten Projekts enthalten. Prüfen Sie Inhalt und Zweck und sichern Sie Wichtiges vor der Entscheidung.
