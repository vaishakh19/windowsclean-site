---
title: "How to find and remove duplicate files on Windows"
description: "Why comparing file names is not enough, how content hashing finds true duplicates, and which duplicates are safe to delete on Windows."
date: 2026-11-17
category: Guides
---

Duplicate files are one of the quietest ways to lose disk space: the same photo imported twice, a download saved three times, a backup folder copied into another backup folder. Finding them reliably is harder than it sounds, because **names and dates can lie**.

## Why file names are not enough

Two files can have different names and identical content (`IMG_0412.jpg` and `IMG_0412 (1).jpg`). Two files can have the same name and different content (`report.docx` in two different projects). Matching by name will give you false positives and false negatives. Matching by size is better but still not proof: different files can share a size.

## How a reliable duplicate finder works

A dependable tool works in stages:

1. **Group by size.** Files with a unique size cannot be duplicates, so they are skipped. This removes most files cheaply.
2. **Hash the rest.** For each group of same-size files, the tool reads the content and computes a cryptographic hash such as **SHA-256**. A hash is a short fingerprint of the file's bytes.
3. **Compare fingerprints.** Files with the same SHA-256 hash have, for all practical purposes, identical content.

[Windows Clean](/) identifies duplicates this way, by SHA-256 content, and the duplicate detection is part of the free version. Everything runs on your PC; your files are not uploaded.

## Checking two files yourself

You can compare two specific files in PowerShell:

```
Get-FileHash "C:\Photos\a.jpg" -Algorithm SHA256
Get-FileHash "D:\Backup\a.jpg" -Algorithm SHA256
```

If the two hashes are identical, the files are identical.

## Which duplicates are safe to delete

Safe candidates:

- **Photos and videos** imported or exported more than once.
- **Downloads** saved repeatedly (installers, PDFs, ZIP files).
- **Old copies of folders** you moved without deleting the original.
- **Music and documents** copied between drives for convenience.

## Which duplicates to leave alone

This is where careless cleaning causes damage.

- **System and program files.** Windows and apps legitimately keep identical copies of DLLs in different folders, because each program expects its own. Deleting one can break the app. Stay out of `C:\Windows`, `C:\Program Files` and `C:\Program Files (x86)`.
- **Hard links.** Files in [WinSxS](/articles/why-is-winsxs-so-big/) share data with other folders and are not real extra copies.
- **Project folders.** Identical `node_modules`, `.git` or library files across projects are often required by each project.
- **Synced folders.** If a folder is synced with OneDrive, Dropbox or similar, deleting a "duplicate" may delete it everywhere.

## A safe process

1. **Scan the folders you control** (Pictures, Documents, Downloads, a backup drive), not the whole system drive.
2. **Decide which copy to keep** before deleting: the one in the folder you actually use, or the one with the clearest name.
3. **Send to the Recycle Bin**, not permanent delete, so a mistake can be undone.
4. **Empty the bin later,** once you're sure. See [Recycle Bin disk space](/articles/recycle-bin-disk-space/).

In Windows Clean, deleting is a Pro feature. Files go to the Recycle Bin by default after you confirm, and the app refuses to delete drive roots, protected Windows locations and symlinks or junctions.

## How much can you expect to recover?

It varies widely. A drive with years of photo imports and backups may hold tens of gigabytes of duplicates; a clean work laptop may hold almost none. If you only need the quickest wins, start with [the biggest files](/articles/find-large-files-windows/), then run a duplicate scan on your personal folders.

## The short version

Match by content, not by name. Ignore system and program folders. Keep one copy deliberately, and use the Recycle Bin when you delete.
