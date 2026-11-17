---
title: "Why is the AppData folder so big? What is safe to clean"
description: "AppData often holds tens of GB of caches. What Local, LocalLow and Roaming mean, what is safe to clear and what to leave alone."
date: 2026-11-17
category: Storage Tips
---

On many PCs, `C:\Users\YourName\AppData` is one of the largest folders on the drive, and it is hidden, so people rarely look in it. It holds a mix of harmless caches and settings you really don't want to lose. The trick is telling them apart.

## How to open AppData

AppData is hidden. Press **Win + R**, type `%AppData%` and press Enter. That opens `Roaming`; click **AppData** in the address bar to see the parent folder. You can also type `%LocalAppData%` to jump to the `Local` folder, which is usually where the space goes.

## The three folders

- **Local:** data specific to this PC. It's where most caches live and where most of the size is. Not synced between computers.
- **LocalLow:** data for apps that run with lower permissions, such as some browser components. Usually small.
- **Roaming:** settings and data intended to follow your user account between computers on a domain. Usually small but important.

## Common space users in Local

| Where | What it is | Safe to clear? |
| --- | --- | --- |
| `Local\Temp` | Temporary files from apps and installers | Yes, skip files in use |
| Browser caches (Chrome, Edge, Firefox) | Cached pages, images and scripts | Yes, from browser settings |
| Chat and video apps (Teams, Discord, Slack, Zoom) | Cached media and logs | Usually yes, from the app or by closing it first |
| `Local\Microsoft\Windows\Explorer` | Thumbnail cache | Yes, Windows rebuilds it |
| `Local\Packages` | Data for Microsoft Store apps | Use the app's own **Reset**, not manual deletion |
| Developer caches (npm, pip, NuGet, Docker, WSL) | Downloaded packages and images | Yes, with each tool's own clean command |
| `Local\D3DSCache` | DirectX shader cache | Yes, and it is rebuilt |

## What to leave alone

- **`Roaming` application folders** unless you know the app. They store settings, profiles and sometimes game saves or licences.
- **Email data files** such as Outlook `.ost` and `.pst`. A `.pst` can be your only copy of mail.
- **Password manager, wallet and authenticator data.**
- **Game saves** stored under `Local`, `LocalLow` or `Roaming`. See [reclaiming space from game installs](/articles/gamer-guide-reclaim-game-space/) for how to find them first.

## The safest way to clean

1. **Find the heavy subfolders first.** A [disk analyzer](/articles/best-disk-space-analyzers-windows/) shows which app folders in `AppData` are largest, so you spend time on those and not on a 4 KB folder.
2. **Close the application** before clearing its cache.
3. **Use the app's own option** (browser **Clear browsing data**, **Settings → Apps → Advanced options → Reset or Storage**), which removes only what is safe.
4. **For `Temp`,** use **Settings → System → Storage → Temporary files**, or let [Storage Sense](/articles/storage-sense-vs-disk-cleanup/) do it on a schedule.
5. **Delete to the Recycle Bin** for anything you remove manually.

## Why is the folder so big in the first place?

Apps built on web technologies (Electron, Chromium) each carry their own browser-style cache, so a few chat and editing apps can add several gigabytes. Developer tools download complete packages and container images. Over a year or two, that compounds. None of it is damaging, but it isn't cleaned automatically.

## The short version

`AppData\Local` is mostly caches that apps rebuild, so it is the right place to look for space. Clean through each app's own settings, leave `Roaming` and data files alone, and look at the folder sizes first. More general steps are in [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).
