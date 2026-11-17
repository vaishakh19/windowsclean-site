---
title: "How to find the biggest files on Windows (3 methods)"
description: "Three ways to list the largest files on Windows 10 and 11: File Explorer search, PowerShell, and a disk analyzer. Includes the exact commands."
date: 2026-11-17
category: Guides
---

When a drive fills up, the cause is usually a small number of very large files: a forgotten ISO, a screen recording, a game capture, an old backup. Finding them takes a minute if you use the right method. Here are three, from simplest to most thorough.

## Method 1: File Explorer search

File Explorer can filter by size without any extra tools.

1. Open the drive or folder you want to check (for example `C:\Users\YourName`).
2. Click the search box and type `size:>1GB`.
3. Wait for the search to finish, then click **Sort → Size → Descending** (or right-click the column header and add **Size**).

You can also use the built-in size words: `size:gigantic` means larger than 128 MB, `size:huge` means 16–128 MB. Typing a number gives you finer control, for example `size:>500MB`.

**Limits:** Explorer search is slow on a large drive, skips places it doesn't index, and lists files without telling you which *folders* are heavy. It also can't show you the size of a folder made of thousands of small files.

## Method 2: PowerShell

PowerShell gives an exact, sortable list. Open **Windows Terminal** or PowerShell and run:

```
Get-ChildItem C:\Users -Recurse -File -ErrorAction SilentlyContinue |
  Sort-Object Length -Descending |
  Select-Object -First 25 FullName, @{n='GB';e={[math]::Round($_.Length/1GB,2)}}
```

Change `C:\Users` to any folder. `-ErrorAction SilentlyContinue` hides "access denied" messages for protected folders. Scanning a whole drive this way can take several minutes and reads every file entry, so start with the folders you suspect.

**Limits:** it prints a list only. You still need to open each location to decide what to do, and you get no overview of which folders dominate.

## Method 3: a disk analyzer

A disk space analyzer scans once, then lets you explore the result visually. This is the fastest way to answer "what is using my drive?" because you see folders *and* files in one picture, and you can drill down by clicking.

[Windows Clean](/) is built for this. It lists large files, shows the drive as a sunburst, a treemap or a file list, and runs locally with no account and no administrator rights. Large-file listing is part of the free version. Which view suits which question is covered in [Sunburst vs Treemap vs File List](/articles/sunburst-vs-treemap-vs-file-list/). Other tools are compared in [best free disk space analyzers](/articles/best-disk-space-analyzers-windows/).

## What large files are usually safe to remove

Look for these first:

- **Installers and ISO images** in `Downloads` you have already used.
- **Screen recordings and game captures** (`Videos\Captures`).
- **Old backups** and exports you have copied elsewhere.
- **Duplicate copies** of large media. See [finding duplicate files](/articles/find-duplicate-files-windows/).

## What to leave alone

- **`pagefile.sys`, `hiberfil.sys`, `swapfile.sys`** in the drive root. They are system files with their own rules. See [pagefile.sys explained](/articles/pagefile-sys-explained/) and [hiberfil.sys explained](/articles/hiberfil-sys-explained/).
- **Anything inside `C:\Windows`,** including [WinSxS](/articles/why-is-winsxs-so-big/).
- **Virtual machine disks and databases** unless you know what uses them. A `.vhdx`, `.vmdk` or `.ost` file may be someone's whole working environment.

## Before you delete anything

1. Check the full path and the file type. A name alone can mislead.
2. Move it to the Recycle Bin first, not permanent delete, so you can recover it.
3. Empty the bin only after you have confirmed that nothing broke. See [Recycle Bin disk space](/articles/recycle-bin-disk-space/).

## The short version

Use `size:>1GB` in Explorer for a quick look, PowerShell when you want an exact list, and a disk analyzer when you want to understand the whole drive. Then delete only what you can identify.
