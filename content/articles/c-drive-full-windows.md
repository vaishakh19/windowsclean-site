---
title: "C drive full? 10 safe ways to free space on Windows"
description: "A step-by-step checklist for a full C drive on Windows 10 and 11: find what is using the space first, then clean only what is safe."
date: 2026-11-17
category: Storage Tips
---

A full C drive slows Windows down, blocks updates and makes apps crash. The mistake most people make is cleaning blindly. **Find out what is using the space first**, then remove only what is safe. This checklist goes from the quickest wins to the bigger decisions.

## Step 0: see where the space went

Open **Settings → System → Storage**. Windows shows a rough category split (Apps, Temporary files, Documents and so on), but it won't show you individual folders or files. For that you need a disk analyzer that draws the whole drive. A [sunburst, treemap or file list](/articles/sunburst-vs-treemap-vs-file-list/) shows the real offenders in seconds. See [the best free disk space analyzers](/articles/best-disk-space-analyzers-windows/) for options, including [Windows Clean](/).

Most full drives come down to a handful of folders. Once you know which ones, the steps below tell you what is safe.

## 1. Empty the Recycle Bin

Deleted files keep using space until the bin is emptied. It is the easiest win and the most commonly forgotten. Details in [Recycle Bin disk space](/articles/recycle-bin-disk-space/).

## 2. Delete temporary files

Go to **Settings → System → Storage → Temporary files**. Tick what you want removed (Temporary files, Windows Update Cleanup, Delivery Optimization files, thumbnails) and click **Remove files**. Read each description before ticking. The **Downloads** option is listed here too, and it is not temporary: leave it unticked unless you have checked that folder.

## 3. Turn on Storage Sense

Storage Sense does the routine cleaning automatically. [Storage Sense vs Disk Cleanup](/articles/storage-sense-vs-disk-cleanup/) explains which settings are worth changing.

## 4. Find and remove the biggest files

A few large files (old videos, ISO images, installers, game recordings) usually outweigh thousands of small ones. [How to find the biggest files on Windows](/articles/find-large-files-windows/) shows three ways to list them.

## 5. Remove duplicate files

Photo imports, backups and repeated downloads leave identical copies behind. [Finding duplicate files](/articles/find-duplicate-files-windows/) covers how to check by content, not by name, and which duplicates to leave alone.

## 6. Delete Windows.old

After a major Windows upgrade, the previous installation can occupy many gigabytes. Windows removes it on its own after about ten days, but you can remove it sooner. See [how to delete Windows.old safely](/articles/windows-old-folder-delete/).

## 7. Shrink the hibernation file

`hiberfil.sys` is typically about 40% of your RAM. If you never hibernate, you can reclaim it. See [what hiberfil.sys is](/articles/hiberfil-sys-explained/).

## 8. Check restore points

System Restore snapshots can quietly grow. [Restore points and disk space](/articles/system-restore-points-disk-space/) explains how to cap them without losing your safety net.

## 9. Look inside AppData

Browser caches, chat apps and developer tools store gigabytes in `AppData`. [What is safe to clean in AppData](/articles/appdata-folder-too-big/) separates caches from settings.

## 10. Move or uninstall what you don't use

Games are the biggest single category for many people. [Reclaiming space from game installs](/articles/gamer-guide-reclaim-game-space/) covers where they hide. For anything else, **Settings → Apps → Installed apps** can be sorted by size.

## What not to do

- **Don't delete `WinSxS` by hand.** See [why WinSxS is so big](/articles/why-is-winsxs-so-big/).
- **Don't delete `pagefile.sys` or turn off virtual memory** to save space. See [pagefile.sys explained](/articles/pagefile-sys-explained/).
- **Don't use "registry cleaners" or "PC booster" tools** that promise instant space. They rarely free meaningful space and can cause problems.
- **Don't delete from `C:\Windows` or `System Volume Information`** unless a Microsoft-supported tool does it.

## If space is still tight

If the drive is genuinely too small for how you use it, cleaning only buys time. Moving your Documents, Pictures or game library to a second drive, or adding storage, is the lasting fix. Keep roughly 10–15% of the drive free so Windows has room for updates and temporary files.

## The short version

Look before you delete. Empty the Recycle Bin, clear temporary files, find the biggest files and duplicates, and only then consider system items such as `Windows.old`, hibernation and restore points.
