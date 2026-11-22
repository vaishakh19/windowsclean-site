---
title: "Find and remove duplicate files on Windows (by content)"
description: "Find duplicate files on Windows by comparing SHA-256 content, not names. A free PowerShell method and how to avoid deleting the wrong copy."
date: 2026-11-14
category: Guides
---

Duplicate files quietly waste gigabytes: photos copied twice, the same installer downloaded three times, old backup folders that mirror your Documents. Finding them is easy once you know the right method. Removing them safely takes a little care.

## Why file names are not enough

Two files named `holiday.jpg` can be completely different. Two files with different names can be byte-for-byte identical. The only reliable test is to compare **content**.

The standard way is a **hash**. A hash function such as SHA-256 reads a file and produces a short fingerprint. If two files have the same SHA-256 hash, their content is identical for all practical purposes.

A good duplicate finder follows this order, which is also fast:

1. Group files by **size**. Files of different sizes cannot be identical.
2. Compute the **SHA-256 hash** only for files that share a size.
3. Report groups of files with the same hash.

Windows Clean's duplicate detection works on SHA-256 content, so it does not get fooled by renamed copies.

## Free method: PowerShell

You can find duplicates in a folder without installing anything. Open PowerShell and run (change the path):

```
Get-ChildItem "D:\Photos" -Recurse -File |
  Get-FileHash -Algorithm SHA256 |
  Group-Object Hash |
  Where-Object Count -gt 1 |
  ForEach-Object { $_.Group | Select-Object Hash, Path }
```

This lists every group of identical files. It reads every file completely, so it is slow on large folders and big drives. You also get no preview, and it has no built-in way to pick which copy to keep, so use it as a report, not a cleaner.

## Which copy should you keep?

Before you delete anything, decide with a simple rule:

- Keep the copy in the **organized location** (your photo library, a project folder).
- Delete copies in **Downloads**, **Desktop** and old **backup** folders.
- Keep the copy with the **oldest creation date** if you are unsure, since it is usually the original.
- Never delete both. Always confirm one copy remains.

## Where duplicates hide

- **Downloads** (the same installer downloaded again and again)
- **Photo folders** merged from phones, cloud sync and old backups
- **Project folders** copied "just in case" (`Project`, `Project - Copy`, `Project_final2`)
- **Game and mod libraries** copied between drives. See the [gamer space guide](/articles/gamer-guide-reclaim-game-space/).

## What not to dedupe

- **Files inside `C:\Windows` and `Program Files`.** Many identical files exist on purpose, and Windows uses hard links for them. Removing one can break an app. This is also why [WinSxS looks bigger than it is](/articles/why-is-winsxs-so-big/).
- **Empty or tiny files** (such as `.gitkeep`). They save nothing and are often needed.
- **Application data.** Do not clean `AppData` by duplicates. See [AppData guide](/articles/appdata-folder-too-big/).

## Delete safely

Move duplicates to the **Recycle Bin** first, not permanent delete, so you can undo a mistake. Windows Clean Pro deletes to the Recycle Bin by default, asks for confirmation and refuses protected Windows locations. Remember the bin still uses space until you [empty it](/articles/recycle-bin-disk-space/).

## Frequently asked questions

### Is SHA-256 reliable for finding identical files?

Yes. The chance that two different files share a SHA-256 hash is negligible in practice.

### Are duplicate files always safe to delete?

No. Duplicates inside program or system folders are often intentional. Stick to your own documents, media and downloads.

### How much space do duplicates usually waste?

It varies widely. Photo libraries and Downloads folders often hold several gigabytes. A scan will show your real number.
