---
title: "Gamer guide: reclaiming space from a huge game install"
description: "Where Steam, Epic, Xbox and Battle.net store games and saves on Windows, how to check exact sizes before deleting, and how to free space safely."
date: 2026-11-05
category: Guides
---

Modern games are huge, and a handful of installs can fill a 1 TB drive. Before you uninstall anything, find out which games take the most space, where their data actually lives, and which files must be kept.

## Where games install by default

| Launcher | Default location |
| --- | --- |
| **Steam** | `C:\Program Files (x86)\Steam\steamapps\common` |
| **Epic Games** | `C:\Program Files\Epic Games` |
| **Xbox app / Game Pass (PC)** | A folder you choose, often `C:\XboxGames`, or `C:\Program Files\WindowsApps` for older Store installs |
| **Battle.net** | `C:\Program Files (x86)` or the path you chose |
| **EA app / Ubisoft Connect** | Their own folders under `Program Files` |

Steam, Epic and others let you add other **library folders** on other drives, so your games may not be where you expect. Steam lists them under **Settings → Storage**.

## Step 1: find which games are the biggest

Don't guess. A game's size in a launcher can leave out shader caches, mods and saves that live elsewhere. A [disk analyzer](/articles/best-disk-space-analyzers-windows/) such as [Windows Clean](/) shows the real size of each game folder in a treemap or sunburst, so a 90 GB install stands out immediately. The file list view is useful for checking the exact path before you act; see [Sunburst vs Treemap vs File List](/articles/sunburst-vs-treemap-vs-file-list/).

## Step 2: know where saves and settings live

Uninstalling through a launcher usually keeps your saves, but not always, and deleting folders by hand can remove them. Common save locations:

- `Documents\My Games\<game>`
- `Documents\<publisher>\<game>`
- `AppData\Local\<game>` and `AppData\LocalLow\<publisher>`
- `AppData\Roaming\<game>`
- `Steam\userdata\<your ID>` for Steam cloud and local saves
- `Saved Games` in your user folder

Check whether the game has **cloud save** turned on in its launcher. If it does, your progress is stored online and can be restored on reinstall. If it doesn't, copy the save folder somewhere safe first. For more on the hidden `AppData` locations, see [Why is AppData so big?](/articles/appdata-folder-too-big/).

## Step 3: free space without losing progress

In order of safety:

1. **Uninstall games you no longer play** from the launcher, not by deleting folders. You can reinstall later.
2. **Move a game to another drive** instead of removing it. In Steam, open **Settings → Storage**, add a drive, then use the game's **Move install folder** option. Epic and others have similar options or a move-and-point method.
3. **Clear shader caches.** Steam keeps compiled shaders in `steamapps\shadercache`, and Windows keeps a DirectX shader cache that you can clear in **Settings → System → Storage → Temporary files**. Games rebuild them, with a brief stutter the first time.
4. **Delete old recordings and captures** in `Videos\Captures` and your GPU software's recording folder. They are often tens of gigabytes. See [how to find the biggest files](/articles/find-large-files-windows/).
5. **Remove unused mods and texture packs** through the mod manager.

## What not to do

- **Don't delete folders inside `WindowsApps`.** It is protected, and removing things by hand can break Store and Xbox games.
- **Don't delete a game folder in Explorer** and call it uninstalled. The launcher will still think it's installed and may show errors or try to re-download.
- **Don't clear `AppData` wholesale** hoping for space. You could delete saves and settings.
- **Don't run "game booster" cleaners** that remove files you didn't review.

## A simple routine

1. Scan the drive and find the five biggest game folders.
2. Ask of each: have I played this in the last six months?
3. Uninstall or move the rest.
4. Back up saves for anything you'd hate to lose.
5. Empty the bin after the games still launch. See [Recycle Bin disk space](/articles/recycle-bin-disk-space/).

If space is still tight, the broader checklist in [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/) applies to gaming PCs too.

## The short version

Find the biggest installs first, protect your saves, and use the launcher to uninstall or move games instead of deleting folders yourself.
