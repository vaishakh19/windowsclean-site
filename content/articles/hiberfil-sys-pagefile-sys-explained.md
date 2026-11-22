---
title: "hiberfil.sys, pagefile.sys and swapfile.sys: what they are"
description: "Three huge hidden files on your C: drive explained. What each does, how big it gets, and the safe way to shrink hiberfil.sys and manage the page file."
date: 2026-11-10
category: Storage Tips
---

If you scan your C: drive with hidden files included, you will probably find three big files at the top: `hiberfil.sys`, `pagefile.sys` and sometimes `swapfile.sys`. Together they can take 20 GB or more. Here is what they do and what you can safely change.

## hiberfil.sys: hibernation and Fast Startup

**What it does.** When you hibernate, Windows saves the contents of your RAM to `hiberfil.sys` and powers off completely. **Fast Startup** (the default "Shut down" behaviour on many PCs) also uses this file to boot faster.

**How big is it?** It is sized relative to your installed RAM. Expect roughly 40% of RAM by default or more, so 16 GB of RAM can mean a hibernation file in the range of 6 GB or more.

### Shrink it

Open **Command Prompt as administrator** and run:

```
powercfg /h /type reduced
```

This keeps Fast Startup but removes full hibernation support, and the file shrinks substantially.

### Remove it

```
powercfg /h off
```

This deletes `hiberfil.sys`, disables hibernation and turns off Fast Startup. You can bring it back with `powercfg /h on`. Do not delete the file by hand. Windows will recreate it, and the command is the supported way.

**Who should disable it?** Desktop PCs with fast SSDs where you never hibernate. **Who should keep it?** Laptops where hibernate saves battery and your open work.

## pagefile.sys: virtual memory

**What it does.** When physical RAM runs low, Windows moves less-used data to `pagefile.sys`. It also lets Windows write crash dumps. Without it, some apps may fail to start under memory pressure.

**How big is it?** By default Windows manages the size itself and it can reach several gigabytes.

### Should you change it?

For almost everyone: **leave it system-managed**. Disabling the page file saves disk space but can cause crashes and prevent crash dumps, even on PCs with a lot of RAM.

If you want to move it to a faster or bigger drive:

1. Press **Win + R**, type `sysdm.cpl`, press Enter.
2. Open **Advanced → Performance → Settings → Advanced → Virtual memory → Change**.
3. Untick **Automatically manage paging file size for all drives**, pick a drive, choose a size or **System managed size**, and click **Set**.
4. Restart the PC.

## swapfile.sys: a small helper

`swapfile.sys` supports Microsoft Store (UWP) apps that Windows suspends. It is normally small (tens to a few hundred megabytes). You cannot meaningfully shrink it, and there is no reason to.

## Summary

| File | Typical size | Safe to change? |
|---|---|---|
| `hiberfil.sys` | About 40% of RAM or more | Yes, with `powercfg` |
| `pagefile.sys` | A few GB, system-managed | Leave it, or move to another drive |
| `swapfile.sys` | Small | Leave it |

## Where else is your space going?

If these files are not your problem, the rest of the usual suspects are listed in our [C: drive full guide](/articles/c-drive-full-windows-11/). Scan the drive to see real sizes before changing anything, and remember [WinSxS](/articles/why-is-winsxs-so-big/) and the [Recycle Bin](/articles/recycle-bin-disk-space/) too.

## Frequently asked questions

### Can I delete hiberfil.sys manually?

Do not. Use `powercfg /h off`. Windows owns the file and will recreate it if you remove it the wrong way.

### Will disabling hibernation slow down my PC?

It turns off Fast Startup, so a cold boot may take a few seconds longer on some machines. Day-to-day speed is not affected.

### Why can't I see these files in File Explorer?

They are protected operating system files and hidden by default. A disk space analyzer that includes hidden files will list them.
