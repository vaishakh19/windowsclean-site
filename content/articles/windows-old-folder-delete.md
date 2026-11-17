---
title: "How to safely delete the Windows.old folder"
description: "Windows.old keeps your previous Windows version and can use many GB. When Windows removes it on its own and how to delete it safely."
date: 2026-11-17
category: Storage Tips
---

After a major Windows upgrade you may find a new folder, `C:\Windows.old`, that can take up many gigabytes. It is legitimate, it is safe to remove once you no longer need it, and it should be removed with the right tool rather than by hand.

## What Windows.old is

When Windows installs a feature update or upgrades to a new version, it keeps your **previous Windows installation** in `Windows.old`. It contains the old system files, along with copies of the user profile data from the old install. Its purpose is to let you **go back** to the previous version if the upgrade causes problems.

## When does Windows delete it?

Windows removes `Windows.old` automatically about **10 days** after the upgrade on current Windows 10 and 11 releases. It may remove it sooner if the drive runs very low on space. If you have turned on [Storage Sense](/articles/storage-sense-vs-disk-cleanup/), cleanup can happen automatically.

If it is older than that and still on your drive, something prevented cleanup, or you are looking at a folder left from a much older upgrade. Either way you can remove it yourself.

## Should you delete it?

Delete it if:

- The new Windows version is working fine.
- You have already checked that your files and apps are intact.
- You need the space.

Wait if:

- You upgraded recently and are still deciding whether to roll back.
- You aren't sure that your important files were migrated. Look in `Windows.old\Users\YourName` first and copy anything missing.

**After deletion you can no longer roll back** to the previous version with the built-in option. A clean reinstall would be the only path back.

## How to delete it (Windows 11 and 10)

1. Open **Settings → System → Storage**.
2. Choose **Temporary files** (it can take a moment to calculate).
3. Tick **Previous Windows installation(s)**.
4. Click **Remove files**.

### Disk Cleanup alternative

1. Press **Win + R**, type `cleanmgr` and press Enter.
2. Choose the C drive and click **Clean up system files**.
3. Tick **Previous Windows installation(s)** and click **OK**.

The system checks permissions and removes the folder correctly. It can take several minutes.

## Why not delete the folder in File Explorer?

You'll usually be refused, because many files inside are protected and owned by the system. Forcing it with ownership-changing commands is possible but risky and unnecessary; the Settings and Disk Cleanup options are designed for this.

## If "Previous Windows installation" isn't listed

That usually means it is already gone, or the folder is something else, for example a leftover from an unfinished upgrade. Look at the folder size before deciding anything. [A disk analyzer](/articles/best-disk-space-analyzers-windows/) shows how much space it really uses, so you know whether it is worth the trouble.

## Other large items after an upgrade

Upgrades also leave behind **Windows Update Cleanup** files, which Storage settings can remove, and sometimes a `$WINDOWS.~BT` folder from the upgrade process. The component store `WinSxS` also looks large but is not safe to delete manually; see [why WinSxS is so big](/articles/why-is-winsxs-so-big/).

For the complete list of safe cleanups, see [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).

## The short version

`Windows.old` is your safety net for the last upgrade. Windows deletes it by itself after about 10 days; if you want the space sooner, remove it through **Settings → Storage → Temporary files**, not by deleting the folder yourself.
