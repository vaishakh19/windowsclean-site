---
title: "Windows.old folder: can you delete it, and how?"
description: "Windows.old can use 10–30 GB after an upgrade. What it contains, when Windows removes it, and the safe way to delete it from Settings or Disk Cleanup."
date: 2026-11-12
category: Storage Tips
---

After a big Windows upgrade, you may find a new folder called **Windows.old** on your C: drive, often 10 GB to 30 GB in size. It is a safety copy of your previous Windows installation. Here is what is in it and how to remove it properly.

## What is Windows.old?

When Windows upgrades to a new version (for example from Windows 10 to 11, or a major feature update), it keeps your old system files in `C:\Windows.old`. It lets you **roll back** if the upgrade causes problems. It can also contain old user profile data from the previous setup.

## Can I delete it?

Yes, once you are sure you do not want to go back to the old version. After deletion:

- You **cannot roll back** to the previous Windows version from Settings.
- Your current files, apps and settings are not affected.

Windows normally removes the folder by itself after a set period (about 10 days on current versions). If your drive is tight on space, you can remove it earlier.

## Check first for personal files

Occasionally, files from an old profile end up in `Windows.old\Users`. Open the folder and look inside `Windows.old\Users\<name>\Documents`, `Desktop` and `Pictures` before you remove it. Copy anything you still need.

## How to delete Windows.old safely

### Option 1: Settings (recommended)

1. Open **Settings → System → Storage**.
2. Click **Temporary files** (or **Cleanup recommendations** on Windows 11).
3. Tick **Previous Windows installation(s)**.
4. Click **Remove files**.

### Option 2: Disk Cleanup

1. Press **Start**, type `Disk Cleanup` and open it.
2. Select your C: drive and click **Clean up system files**.
3. Tick **Previous Windows installation(s)** and click **OK**.

### What not to do

Do not press Delete on the folder in File Explorer. It has special permissions and usually refuses, and forcing it with ownership changes is unnecessary and risky. The two methods above handle it correctly.

## If the option is missing

The **Previous Windows installation(s)** line only appears when the folder exists and Windows has not already removed it. If you cannot see it, there is nothing to clean. Scan the drive to confirm, using a [disk space analyzer](/articles/sunburst-vs-treemap-vs-file-list/).

## More ways to free space

Windows.old is only one of several large system items. Continue with the [full C: drive checklist](/articles/c-drive-full-windows-11/), check [hibernation and page files](/articles/hiberfil-sys-pagefile-sys-explained/), and read about the [WinSxS folder](/articles/why-is-winsxs-so-big/).

## Frequently asked questions

### How big is Windows.old?

Usually between 10 and 30 GB, depending on your old installation and installed apps.

### Will deleting Windows.old affect my programs?

No. Installed programs and your current settings live in the new Windows installation.

### Windows.old is gone but my drive is still full. Why?

Other items may be taking the space. Check the [Recycle Bin](/articles/recycle-bin-disk-space/) and run a scan to see real folder sizes.
