---
title: "C drive full on Windows 10/11? Find what is using space"
description: "A step-by-step guide to a full C: drive: find the biggest folders, clear temporary files, and know which Windows files are safe to shrink or leave alone."
date: 2026-11-08
category: Guides
---

A C: drive that is almost full slows Windows down, blocks updates and makes apps crash. The good news: you rarely need to delete anything important. The space is usually taken by a handful of known culprits.

Follow these steps in order, from the quickest wins to the deeper checks.

## Step 1: See what is actually using the space

Guessing wastes time. Open **Settings → System → Storage** to get a category summary (Apps, Temporary files, Documents and so on). It is a good start, but it only shows broad categories.

To see the exact folders and files, scan the drive with a disk space analyzer such as [Windows Clean](/). Open the **sunburst** to spot the heavy top-level folders, then switch to the **treemap** to find single large items. [This guide](/articles/sunburst-vs-treemap-vs-file-list/) explains when to use each view.

On most PCs the biggest items are:

1. `C:\Users\<you>` (downloads, videos, desktop, `AppData`)
2. `C:\Windows` (including `WinSxS`)
3. `C:\Program Files` and `Program Files (x86)`
4. Hidden system files: `hiberfil.sys`, `pagefile.sys`, `swapfile.sys`

## Step 2: Quick wins that are always safe

- **Empty the Recycle Bin.** It is the single most common reason a drive stays full after deleting files. [Details here](/articles/recycle-bin-disk-space/).
- **Clear temporary files.** Open **Settings → System → Storage → Temporary files**, review the list, and remove items such as Windows Update cleanup, Delivery Optimization files, thumbnails and the DirectX shader cache. Read the descriptions first. Do not tick **Downloads** unless you really want that folder emptied.
- **Turn on Storage Sense** in the same Settings page so Windows clears temporary files and old Recycle Bin items automatically.
- **Uninstall apps and games you no longer use** from **Settings → Apps → Installed apps**. Sort by size to see the biggest first. For game libraries, read the [gamer space guide](/articles/gamer-guide-reclaim-game-space/).

## Step 3: Large personal files

Videos, ISO files, old backups, virtual machine disks and phone backups are common space hogs. Sort the file list by size and move what you want to keep to an external drive or another partition.

Also look for **duplicates**. Copied photo folders and repeated downloads add up quickly. See how to [find duplicate files on Windows](/articles/find-duplicate-files-windows/).

## Step 4: System files (read before you touch)

These are real space users, but each needs the right tool, not manual deletion:

| Item | What it is | Safe action |
|---|---|---|
| `C:\Windows\WinSxS` | Component store; size in Explorer is overstated | Use DISM, never delete by hand. [Guide](/articles/why-is-winsxs-so-big/) |
| `C:\Windows.old` | Backup of your previous Windows version | Remove with Storage settings or Disk Cleanup. [Guide](/articles/windows-old-folder-delete/) |
| `hiberfil.sys` | Hibernation and Fast Startup data | Shrink or disable with `powercfg`. [Guide](/articles/hiberfil-sys-pagefile-sys-explained/) |
| `pagefile.sys` | Virtual memory | Leave it system-managed. [Guide](/articles/hiberfil-sys-pagefile-sys-explained/) |
| `System Volume Information` | Restore points and shadow copies | Limit its size. [Guide](/articles/system-volume-information-restore-points/) |
| `AppData` | Caches and app data | Clear caches inside the apps. [Guide](/articles/appdata-folder-too-big/) |

## Step 5: Still full? Move, do not just delete

- Move **Documents, Pictures and Videos** to another drive: right-click the folder, **Properties → Location → Move**.
- Install big games and apps on a second drive where possible.
- If you use OneDrive, turn on **Files On-Demand** so files stay in the cloud and only take space when you open them.
- Consider a larger SSD or an external drive if your data simply outgrew the disk.

## How much free space should I keep?

Aim for at least **15–20% free**, and never below about 10 GB. Windows needs room for updates, temporary files and the page file. Below that, expect slow updates and odd errors.

## Frequently asked questions

### Why is my C drive full when I have not installed anything?

Windows updates, the Recycle Bin, temporary files, hibernation data and restore points all grow quietly in the background. A scan shows which one it is.

### Is it safe to delete the Temp folder?

Files inside `%TEMP%` that are not in use are safe to remove. Use **Settings → Storage → Temporary files** so Windows skips anything still needed.

### Can I delete files from C:\Windows to free space?

No. Use supported tools (Storage settings, Disk Cleanup, DISM). Manual deletion in `C:\Windows` can break updates or stop Windows from starting.
