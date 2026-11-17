---
title: "Recycle Bin disk space: why it counts and how to empty it"
description: "Deleted files keep using disk space until the Recycle Bin is emptied. How to check its size, set limits and empty it safely."
date: 2026-11-03
category: Storage Tips
---

You delete a 20 GB folder and your drive shows no more free space than before. The reason is the Recycle Bin: **a deleted file is only moved there, and it keeps using disk space until the bin is emptied.**

## How the Recycle Bin works

Each drive has a hidden folder named `$Recycle.Bin` at its root. When you delete a file normally (Delete key, right-click → Delete), Windows moves it there. The file is still on the same disk, so the used space doesn't change. The Recycle Bin icon on the desktop shows the combined contents of all the drives' bins.

Some deletions **skip** the bin and free space immediately:

- **Shift + Delete.**
- Files on **network shares** and most **removable drives**.
- Files larger than the bin's maximum size for that drive, which Windows offers to delete permanently.
- Anything deleted from a command line or script with `del` or `Remove-Item`.

## How to see how much it holds

Right-click the **Recycle Bin** icon and choose **Properties**. You'll see each drive, with a maximum size setting. Or open the bin and look at the files; **View → Details** adds a size column.

A [disk analyzer](/articles/best-disk-space-analyzers-windows/) can show `$Recycle.Bin` per drive, but remember that it is hidden and may need administrator rights to read.

## How to empty it

- **Right-click → Empty Recycle Bin.** Everything is permanently deleted.
- **Open it first** and delete or restore selected items, if you aren't sure.
- **PowerShell:** `Clear-RecycleBin -Force` empties all drives; `Clear-RecycleBin -DriveLetter C -Force` empties just one.

**There is no undo.** Look through the bin before you empty it, especially after a big clean-up.

## How to keep it under control

### Set a maximum size

In **Recycle Bin Properties**, select a drive and set a **Custom size**. When the bin is full, Windows removes the oldest files to make room for new ones. This is useful on a small SSD.

### Let Windows empty it on a schedule

Turn on **Storage Sense** (**Settings → System → Storage**) and set it to delete Recycle Bin files after 14 or 30 days. [Storage Sense vs Disk Cleanup](/articles/storage-sense-vs-disk-cleanup/) explains the settings.

### Skip the bin entirely (not recommended)

You can choose **Don't move files to the Recycle Bin. Remove files immediately when deleted** in the same dialog. It saves space, but you lose the only safety net for accidents.

## A safer workflow when you clean up

1. Delete files with the normal Delete command so they go to the bin.
2. Check that your PC, apps and games still work for a day or two.
3. Then empty the bin.

This is how deleting works in [Windows Clean](/): in the Pro version, files go to the Recycle Bin by default after you confirm, and permanent delete is a separate command that requires typing DELETE.

## Why the numbers can look wrong

- **Free space didn't change after deleting:** the files are in the bin.
- **Free space changed less than the file size:** other things are also growing, such as [System Restore points](/articles/system-restore-points-disk-space/) or temporary files.
- **The bin looks empty but the drive is still full:** the space is somewhere else. See [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/), or [find the biggest files](/articles/find-large-files-windows/).

## The short version

The Recycle Bin is a holding area, not free space. Empty it after you've checked that nothing is missing, cap its size, or let Storage Sense empty it for you.
