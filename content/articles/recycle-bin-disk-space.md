---
title: "Recycle Bin disk space: why deleted files still use storage"
description: "Deleted files keep using disk space until the Recycle Bin is emptied. How to see how much it holds, shrink its limit and empty it safely."
date: 2026-11-03
category: Storage Tips
---

You deleted 40 GB of videos and your C: drive is still full. The usual reason is simple: the files are not gone. They are sitting in the **Recycle Bin**, and they count against your free space until you empty it.

This guide explains how the Recycle Bin uses disk space, how to see what is inside, and how to empty it without losing something you still need.

## How the Recycle Bin uses disk space

When you press Delete in File Explorer, Windows does not erase the file. It moves it into a hidden folder named `$Recycle.Bin` at the root of the same drive. The data stays exactly where it was on the disk, so the space is not freed.

A few facts that surprise people:

- **Every drive has its own Recycle Bin.** Deleting from `D:` fills `D:\$Recycle.Bin`, not the one on `C:`.
- **Every user has a separate section.** On a shared PC, other accounts' deleted files also count toward the drive.
- **USB sticks and network locations usually have no Recycle Bin.** Files deleted there are removed permanently, with no undo.
- **Shift + Delete skips the bin** and deletes the file permanently.

## See how much the Recycle Bin holds

Open the Recycle Bin on the desktop and look at the file list. Right-click empty space and choose **Sort by → Size** to see the largest items first.

For a drive-by-drive view, right-click the Recycle Bin icon and choose **Properties**. Each drive is listed with its maximum size. If you want the real number, scan the drive with a disk space analyzer. `$Recycle.Bin` is a hidden system folder, so make sure hidden items are included in the scan. If it shows up as one of your largest folders, that is your answer. See [Sunburst vs treemap vs file list](/articles/sunburst-vs-treemap-vs-file-list/) for how to read the result.

## Empty it safely

1. Open the Recycle Bin and scan the list for anything you may still want. Check the **Original Location** and **Date Deleted** columns.
2. Right-click a file and choose **Restore** for anything you need back.
3. Click **Empty Recycle Bin** in the toolbar (or right-click the desktop icon and choose **Empty Recycle Bin**).

Emptying is permanent. Windows will not be able to bring the files back, and ordinary undelete is unreliable afterwards.

You can also use **Settings → System → Storage → Temporary files**, tick **Recycle Bin**, and select **Remove files**.

## Stop it from growing back

- **Lower the limit per drive.** In the Recycle Bin **Properties**, select a drive and set a **Custom size**. A file larger than the limit is deleted permanently instead of being recycled, so do not set it too low if you rely on the safety net.
- **Let Windows clean it automatically.** Open **Settings → System → Storage → Storage Sense**, turn it on, and set how long files may stay in the Recycle Bin (for example 30 days).
- **Delete in the right place.** If you delete huge files you are sure about, you can use Shift + Delete, but only if you are certain. There is no way back.

## When the Recycle Bin is not the problem

If the bin is empty and the drive is still full, look elsewhere: the [WinSxS folder](/articles/why-is-winsxs-so-big/), [hiberfil.sys and pagefile.sys](/articles/hiberfil-sys-pagefile-sys-explained/), an old [Windows.old folder](/articles/windows-old-folder-delete/), or a large [AppData folder](/articles/appdata-folder-too-big/). Our [C: drive full guide](/articles/c-drive-full-windows-11/) walks through all of them in order.

## Frequently asked questions

### Does emptying the Recycle Bin free up disk space?

Yes. Emptying it permanently deletes the files in it, and the space they used becomes free immediately.

### Why is my Recycle Bin greyed out or will not empty?

A file may be in use, or Windows may be indexing it. Close open programs and try again. If the bin looks empty but the drive stays full, restart the PC and check Storage settings again.

### Can I recover files after emptying the Recycle Bin?

Not reliably. Treat emptying as permanent, and check the list before you click.
