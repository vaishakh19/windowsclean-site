---
title: "Size vs Size on Disk: Why Windows Numbers Differ"
description: "Understand Size versus Size on disk in Windows, including allocation units, OneDrive placeholders and hard links, before you delete files."
date: 2026-11-23
category: Storage Tips
---

**Size describes the logical length of a file; Size on disk describes the storage allocated to it as reported by the filesystem and the tool.** These numbers need not match. Allocation units can make physical storage larger, while compression, sparse files and cloud placeholders can make it smaller.

There is another comparison to keep separate: the sum of visible folder sizes versus the drive's total used space. Permissions, filesystem metadata and shared file data can affect that comparison. Neither mismatch automatically means Windows is broken or that a cleanup tool has discovered deletable “hidden junk.”

## Compare like with like first

Right-click one ordinary local file in File Explorer, select **Properties**, and compare **Size** with **Size on disk**. Start with a single file before examining a folder containing thousands of mixed file types.

Record the path, the units displayed and whether the file belongs to OneDrive or a virtual machine. Check that your scanner and Explorer are looking at the same drive and folder. A scan of your user profile is not the same measurement as the entire C: volume.

| Observation | Possible explanation | What to check |
|---|---|---|
| Size on disk is slightly larger | Allocation-unit rounding | Many small local files |
| Size is much larger than local allocation | Cloud placeholders, compression or sparse data | File status and storage type |
| Folder sums exceed expected physical usage | Shared hard-linked data or followed links | Scanner accounting rules |
| Drive usage exceeds visible folder totals | Protected content or filesystem overhead | Scan access and system-managed storage |

This is a diagnostic table, not a deletion list. Establish the cause before taking any action. To find understandable cleanup candidates afterward, follow the guide to [finding large files on Windows](/articles/find-large-files-windows/).

## Allocation units explain small-file overhead

Filesystems allocate storage in units often called clusters. For a normal, nonresident, uncompressed file, a partly used allocation unit can still occupy a full unit. Many small files can therefore have a noticeable gap between their combined logical length and allocation.

As a simplified illustration, if the allocation unit is 4 KiB, a 5 KiB file may need 8 KiB of allocation. Do not apply that arithmetic to every NTFS file: resident data, compression and other filesystem features introduce exceptions. The point is that allocation is not always byte-for-byte storage.

Changing a drive's allocation-unit size is not a routine cleanup method. It can involve formatting or migration and should not be attempted just to make two property values agree.

## OneDrive files can be visible without full local copies

An online-only OneDrive file has a name and a logical size even though its full content is not downloaded. Microsoft documents this in [OneDrive size discrepancies](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match).

Check the Status column in Explorer. A large folder of cloud placeholders is not necessarily occupying the same amount of SSD space. Opening those files can download them, so avoid opening an entire archive merely to investigate its size.

To change local availability without deleting cloud content, follow [OneDrive Files On-Demand](/articles/onedrive-files-on-demand-free-up-space/). Use the drive's free-space figure to judge the effect instead of assuming the folder's logical size equals recoverable storage.

## Compression and sparse files change allocation

Compressed data can use fewer allocated bytes than its uncompressed logical length. Sparse files can represent empty regions without storing every byte physically. Microsoft's [sparse-file documentation](https://learn.microsoft.com/en-us/windows/win32/fileio/sparse-files) explains this distinction.

Virtual disks and other specialized files can also report a virtual capacity that is different from their current host allocation. If the file belongs to WSL or Docker, use its management tools and [compare the two storage layers](/articles/docker-wsl-disk-space-windows/).

Do not convert, compress or alter a live application disk just to reduce a displayed number. The owning software may have specific requirements, and the safe procedure depends on the file type and whether it is in use.

## Hard links can make folder totals misleading

A hard link lets more than one filename refer to the same underlying file data. A tool that sums each path's logical size may count that shared data more than once. A tool that recognizes shared file identity may report a different total.

This matters especially when interpreting the Windows component store. The [WinSxS explanation](/articles/why-is-winsxs-so-big/) covers why its apparent size is not a direct cleanup target. Microsoft also describes hard links in its [NTFS overview](https://learn.microsoft.com/en-us/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems).

Two filenames are not automatically two independently recoverable copies. Do not equate a hard-linked system file with an ordinary duplicate document, or assume deleting one path will reclaim the logical size displayed beside it.

## A scanner cannot always see everything

Drive properties include usage that a normal folder scan may not fully enumerate. Access restrictions, restore data and filesystem metadata can explain part of the difference. See [restore points and disk space](/articles/system-restore-points-disk-space/) before investigating protected system folders.

Windows Clean provides a free offline view of accessible files through a sunburst, treemap and file list, without an account or administrator rights. Use those views to locate understandable personal data, while recognizing that protected storage may be absent. Do not change system permissions just to make a chart total match Explorer.

## Frequently asked questions

### Which number tells me how much I can safely delete?

Neither number establishes safety. Identify the file's owner and purpose first. For the actual effect of an approved cleanup, compare drive free space before and after.

### Why is Size on disk much smaller in OneDrive?

Online-only files can show their logical size while their content remains in the cloud. Check file status; the visible folder size is not necessarily its local storage cost.

### Why do two disk analyzers show different totals?

They may have different access rights, count logical versus allocated bytes, or handle links differently. Compare the same scope and accounting method before concluding one result is wrong.
