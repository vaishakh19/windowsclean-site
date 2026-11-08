---
title: "Warum ist der WinSxS-Ordner so groß – und darf man ihn aufräumen?"
description: "WinSxS zeigt im Explorer oft 6 GB oder mehr. Was darin steckt, warum die Größe täuscht und wie du ihn mit DISM sicher verkleinerst."
date: 2026-11-06
category: Speicher-Tipps
---

Wenn ein Speicher-Analyzer `C:\Windows\WinSxS` als einen der größten Ordner anzeigt, bist du nicht allein. Er liegt oft bei 6 GB oder mehr, und es ist verlockend, ihn zu löschen. **Tu es nicht.** Hier steht, was er ist und wie du ihn sicher verkleinerst.

## Was WinSxS ist

WinSxS ist der **Komponentenspeicher**. Windows bewahrt hier die Dateien auf, die es zum Installieren und Zurücksetzen von Updates, für optionale Features und zur Selbstreparatur braucht. Wer darin von Hand löscht, kann Windows Update und die Systemreparatur beschädigen.

## Warum die Größe täuscht

Die meisten Dateien in WinSxS sind **Hardlinks**, die mit den aktiven Ordnern unter `C:\Windows` geteilt werden. Der Explorer zählt diese Dateien doppelt, deshalb wirkt der Ordner größer, als er tatsächlich Platz belegt.

Die echten Zahlen siehst du in einer Eingabeaufforderung oder PowerShell mit Administratorrechten:

```
Dism.exe /Online /Cleanup-Image /AnalyzeComponentStore
```

Der Bericht zeigt die vom Explorer gemeldete Größe, die **tatsächliche Größe**, den mit Windows geteilten Anteil, den freigebbaren Platz und ob eine Bereinigung empfohlen wird.

## So verkleinerst du ihn sicher

Wenn der Bericht eine Bereinigung empfiehlt, führe aus:

```
Dism.exe /Online /Cleanup-Image /StartComponentCleanup
```

Das entfernt überholte Komponentenversionen, die das System nicht mehr braucht. Alternativ nutzt du die **Datenträgerbereinigung → Systemdateien bereinigen → Bereinigung von Windows Update**.

## Das solltest du vermeiden

- Dateien oder Ordner in `WinSxS` von Hand zu löschen.
- `/ResetBase` anzuhängen, wenn du nicht sicher bist. Dadurch lassen sich bereits installierte Updates nicht mehr deinstallieren.

## Kurz gesagt

WinSxS wirkt größer, als es ist, und die unterstützten Werkzeuge (DISM und Datenträgerbereinigung) sind der einzige sichere Weg, es zu verkleinern. Alles andere in diesem Ordner solltest du in Ruhe lassen.
