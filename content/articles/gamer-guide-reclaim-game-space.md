---
title: "Free up space from huge game installs (Steam, Epic, Xbox)"
description: "Where large game installs, shader caches and save files live on Windows, how to see exact folder sizes, and how to reclaim space without losing saves."
date: 2026-11-05
category: Guides
---

Modern games are enormous. A single title can use 100 GB or more, and a few installs will fill a 512 GB SSD. The tricky part is knowing what is safe to remove. Delete the wrong folder and you can lose your save files.

This guide shows where game data lives on Windows and how to free space without regretting it.

## Where games store their data

| Launcher | Default install location |
|---|---|
| Steam | `C:\Program Files (x86)\Steam\steamapps\common\` |
| Epic Games Store | `C:\Program Files\Epic Games\` |
| Xbox app / Game Pass (PC) | `C:\XboxGames\` (or the drive you chose) |
| Battle.net | `C:\Program Files (x86)\` or a folder you picked |

Your own install paths may differ, because many people choose another drive during installation. A [disk space scan](/articles/sunburst-vs-treemap-vs-file-list/) shows the exact folders and sizes, so you do not have to guess.

## Why games use more space than the install size

The install folder is only part of the story. Look for these as well:

- **Shader caches.** Games and graphics drivers compile shaders and store them to avoid stutter. In Steam they live in `steamapps\shadercache\`. In Windows you can clear the **DirectX Shader Cache** under **Settings → System → Storage → Temporary files**.
- **Downloads and updates.** Steam keeps partial files in `steamapps\downloading\` and `steamapps\temp\`. They can stay there after a failed update.
- **Workshop and mods.** `steamapps\workshop\` can grow into tens of gigabytes if you subscribe to many mods.
- **Recordings and screenshots.** Game DVR clips and captures are saved under your **Videos** folder (often `Videos\Captures`).
- **Launcher caches.** Launchers keep their own cache folders under `AppData`. See [why your AppData folder is so big](/articles/appdata-folder-too-big/).

## Where save files live (do not delete these by accident)

Save games are tiny, but they are the one thing you cannot re-download. Common locations are:

- `C:\Users\<you>\Documents\My Games\`
- `C:\Users\<you>\Saved Games\`
- `C:\Users\<you>\AppData\Local\<GameName>\` and `AppData\Roaming\<GameName>\`
- `Steam\userdata\<id>\` (Steam Cloud local copies)

Uninstalling a game from its launcher usually leaves saves in place, but some games keep them inside the install folder. **Before you remove a game, check that its saves are backed up or in the cloud.**

## How to free space safely

1. **Scan the drive** that holds your games and open the treemap. The biggest rectangles are your biggest games.
2. **List games by size** and decide which ones you have not played in months.
3. **Uninstall through the launcher**, not by deleting folders. In Steam, right-click the game, choose **Manage → Uninstall**. In the Xbox app or Epic launcher, use their uninstall option. This also removes registry entries and keeps the library consistent.
4. **Move instead of delete.** Steam can move an install to another drive: **Steam → Settings → Storage**, pick a drive, and use **Move** on a game. This is also the fix when your SSD is full but you have a second disk.
5. **Clear caches last.** Empty the shader cache and leftover download folders after the big removals.

## What not to delete

- The `steamapps` folder itself. It holds every game and its metadata.
- Anything inside `C:\Windows`, and the hidden `WindowsApps` folder where some Microsoft Store apps live. Remove those apps through Settings.
- Save-game folders you have not backed up.

## Check for duplicates too

If you copy game installers or mod packs between drives, you may be storing the same file twice. A [duplicate file finder](/articles/find-duplicate-files-windows/) confirms identical files by content, not by name.

## Frequently asked questions

### Can I delete the Steam shader cache?

Yes. Steam rebuilds it. You may see short stutters the first time you launch each game afterwards.

### Will uninstalling a game delete my saves?

Often not, but it depends on the game. Check the save location above and back it up first.

### How do I see which game uses the most space?

Scan the install drive and open the treemap. The largest boxes inside `steamapps\common`, `Epic Games` or `XboxGames` are your largest games.
