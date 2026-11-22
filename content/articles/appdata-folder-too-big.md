---
title: "AppData folder too big? What is safe to clean"
description: "Why the AppData folder can reach tens of gigabytes, what lives in Local, Roaming and LocalLow, and which caches are safe to clear without breaking apps."
date: 2026-11-16
category: Storage Tips
---

The `AppData` folder is one of the biggest hidden space users on Windows. It can reach 30 GB or more, and File Explorer does not make it easy to see what is inside. This guide explains the folder and shows which parts you can clean.

## Where is AppData?

It sits inside your user profile: `C:\Users\<you>\AppData`. It is hidden by default. To open it quickly, press **Win + R**, type `%appdata%` and press Enter, then go up one level. You will see three folders:

| Folder | Purpose |
|---|---|
| `Local` | Machine-specific data, caches, temp files. Usually the largest. |
| `LocalLow` | Low-integrity data for sandboxed apps and some games. |
| `Roaming` | Settings that can follow your account between PCs. |

## What usually takes the most space

Scan your profile and look inside `AppData\Local`. Common heavy items:

- **Browser caches.** Chrome, Edge and Firefox store cached pages and media.
- **Temp** (`%LOCALAPPDATA%\Temp`). Leftovers from installers and apps.
- **Chat and collaboration apps.** Discord, Teams, Slack and Spotify caches can grow to several gigabytes.
- **Developer caches.** npm (`%LOCALAPPDATA%\npm-cache`), pip (`%LOCALAPPDATA%\pip\Cache`), NuGet and build tools.
- **Virtual disks.** Docker Desktop and WSL distributions keep large `.vhdx` disk images under `AppData\Local` (for example `...\Packages\<distro>\LocalState\ext4.vhdx`).
- **Game launchers and crash dumps.** See the [gamer guide](/articles/gamer-guide-reclaim-game-space/).

## What is safe to clean

**Generally safe**, with the app closed:

- The `Temp` folder contents. Skip files that are in use.
- Browser caches, but clear them from the browser itself (**Settings → Privacy → Clear browsing data → Cached images and files**), not by deleting folders.
- App caches, via the app's own "clear cache" option.
- Package manager caches via their commands: `npm cache clean --force`, `pip cache purge`.

**Safer to do through Windows:** **Settings → System → Storage → Temporary files** covers temporary files without touching anything important.

## What to leave alone

- **`Roaming`** unless you know the app. It often holds your settings, saved logins and licence information.
- Anything you do not recognise. Look it up first.
- **Docker and WSL disk images.** Do not delete `.vhdx` files by hand. They contain your containers or Linux files. Use `docker system prune` or WSL's export and compact tools instead.
- Folders belonging to **security software**.

## A safe approach

1. **Scan your user profile** and open the treemap. The largest rectangles in `AppData\Local` show where to focus. [See how to read it](/articles/sunburst-vs-treemap-vs-file-list/).
2. **Identify the app** that owns the big folder.
3. **Use that app's own cache cleaner** whenever it has one.
4. If you must delete manually, close the app and **delete to the Recycle Bin** first.
5. **Empty the bin** to actually free the space. See the [Recycle Bin guide](/articles/recycle-bin-disk-space/).

## Related guides

AppData is one piece of a bigger puzzle. For the full list of space users, read [C drive full: how to find what is using space](/articles/c-drive-full-windows-11/).

## Frequently asked questions

### Can I delete the whole AppData folder?

No. It holds settings, logins and data for your apps. Deleting it resets or breaks them.

### Why does AppData keep growing?

Apps rebuild caches as you use them, so a cleaned cache grows again over time. That is normal.

### Is it safe to move AppData to another drive?

It is possible with advanced tools, but it is not supported by Microsoft and can cause problems with updates. Cleaning is the safer route.
