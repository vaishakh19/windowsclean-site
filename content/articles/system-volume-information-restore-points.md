---
title: "System Volume Information too big? Shrink restore points"
description: "Why the hidden System Volume Information folder can use tens of GB, and how to shrink System Restore and shadow copy storage safely with vssadmin."
date: 2026-11-18
category: Storage Tips
---

Your drive is full, your scan only accounts for part of it, and the rest seems to vanish. A common reason is the hidden **System Volume Information** folder, where Windows keeps restore points and shadow copies. It can quietly grow to tens of gigabytes.

## What is System Volume Information?

It is a protected folder at the root of each drive, for example `C:\System Volume Information`. It is used by:

- **System Restore**, which stores restore points so you can undo bad updates or driver installs.
- **Volume Shadow Copy (VSS)**, which takes snapshots used by backup software and the "Previous Versions" feature.
- Other system features, such as indexing data.

## Why you may not see its size

Normal accounts cannot open this folder, and even administrators are blocked by default. A tool that runs without administrator rights may not be able to read it, so its size can be missing from your scan. The gap between "used space" in File Explorer and what a scan adds up to is a clue that this folder, or other protected data, is responsible. For the real numbers, ask Windows directly.

## See how much shadow copy storage is used

Open **Command Prompt as administrator** and run:

```
vssadmin list shadowstorage
```

The output shows the **used**, **allocated** and **maximum** space for each volume.

## How to reduce it

### Option 1: System Protection settings

1. Press **Win + R**, type `sysdm.cpl` and press Enter.
2. Open the **System Protection** tab.
3. Select your C: drive and click **Configure**.
4. Move **Max Usage** down to a smaller percentage (for example a few percent of the drive).
5. Click **Delete** to remove existing restore points if you want the space back now. Click **OK**.

### Option 2: Command line limit

```
vssadmin resize shadowstorage /for=C: /on=C: /maxsize=10GB
```

Change the size to what suits your drive.

### Option 3: Keep only the newest restore point

Open **Disk Cleanup**, choose **Clean up system files**, open the **More Options** tab, and under **System Restore and Shadow Copies** click **Clean up**. This removes all but the most recent restore point.

## Should you turn System Restore off?

Not usually. Restore points are a cheap safety net before updates and driver changes. A better balance is to keep protection on with a smaller maximum. Only switch it off if you have another backup strategy, such as full disk images.

## Never do this

- Do not take ownership of `System Volume Information` and delete its contents manually. You can break restore, backups and search.
- Do not rely on restore points as backups. They do not protect against a failed drive. Keep your own copies of important files.

## Continue the cleanup

For the other big hidden items, see [hiberfil.sys and pagefile.sys](/articles/hiberfil-sys-pagefile-sys-explained/), the [WinSxS component store](/articles/why-is-winsxs-so-big/), and the full [C: drive checklist](/articles/c-drive-full-windows-11/).

## Frequently asked questions

### Is System Volume Information safe to delete?

Do not delete it by hand. Shrink it with the settings above.

### Does a big System Volume Information mean malware?

Usually not. It most often means many restore points or backup snapshots.

### Will reducing restore point storage delete my files?

No. It removes old system snapshots, not your documents.
