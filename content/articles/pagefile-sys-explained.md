---
title: "What is pagefile.sys, and should you move or disable it?"
description: "pagefile.sys is Windows virtual memory. Why disabling it to save space backfires, and how to move or resize it the supported way."
date: 2026-11-17
category: Storage Tips
---

`pagefile.sys` is one of the big hidden files in the root of your C drive, and it often looks like an easy target when you are short of space. Here is what it is, why removing it is rarely a good idea, and what you can do instead.

## What it is

`pagefile.sys` is the **paging file**, Windows' virtual memory. When physical RAM is under pressure, Windows moves memory pages that are not in active use to the paging file so that RAM can serve programs that are. It also supports features that expect a backing store for memory, and it is needed to write a **crash dump** when Windows stops with an error.

You may also see `swapfile.sys` (used for modern apps) and, after a crash, `memory.dmp`. They are separate files.

## Why not just turn it off?

People disable the paging file to save space, thinking that "I have 32 GB of RAM, I don't need it." The problems:

- **Some programs expect it** and may fail with "out of memory" errors even when RAM looks free, because they reserve (commit) more memory than they use.
- **Crash dumps may fail,** which makes diagnosing blue screens harder.
- **The saving is modest** on most modern systems, usually a few gigabytes.
- **Windows manages it well** when left on automatic.

The supported advice is to leave it enabled.

## How big is it?

With the default setting, **System managed size**, Windows chooses the size and adjusts it as needed. On a typical PC it is a few gigabytes. It can grow if you run memory-hungry programs.

## What you can do to save space on C:

### Move it to another drive

If you have a second internal drive with free space, you can store the paging file there:

1. Press **Win + R**, type `sysdm.cpl` and press Enter.
2. Open **Advanced → Performance → Settings → Advanced → Virtual memory → Change**.
3. Untick **Automatically manage paging file size for all drives**.
4. Select the other drive, choose **System managed size**, and click **Set**.
5. Select `C:` and set it to a **small custom size** (for example 800 MB initial and maximum), or leave it system-managed if you want crash dumps to work fully. Click **Set**, **OK**, then restart.

Use a fast internal SSD. A paging file on a slow external drive is a bad idea.

### Leave a small one on C:

If you move the file, keep a small paging file on the system drive so Windows can still write crash information. Complete memory dumps need more room than small dumps.

## What not to do

- **Don't delete `pagefile.sys` manually.** Windows holds it open and recreates it.
- **Don't set a tiny fixed size on every drive,** which risks out-of-memory failures.
- **Don't confuse it with `hiberfil.sys`.** That file is separate; see [what is hiberfil.sys](/articles/hiberfil-sys-explained/) for the one you can legitimately turn off.

## Where the real savings are

If the goal is free space, the paging file is rarely the best place to start. Other items are usually bigger and safer: [the largest files on your drive](/articles/find-large-files-windows/), [the Recycle Bin](/articles/recycle-bin-disk-space/), [Windows.old](/articles/windows-old-folder-delete/) or [AppData caches](/articles/appdata-folder-too-big/). The full checklist is in [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).

## The short version

`pagefile.sys` is virtual memory. Leave it system-managed. If you must reclaim C: space, move it to another fast internal drive through **Virtual memory** settings, keeping a small one on C:.
