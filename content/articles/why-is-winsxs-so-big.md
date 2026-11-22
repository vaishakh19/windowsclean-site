---
title: "Why is the WinSxS folder so big, and is it safe to clean?"
description: "WinSxS often shows 6 GB or more in File Explorer. What it actually contains, why the size is misleading, and the one safe way to shrink it with DISM."
date: 2026-11-06
category: Storage Tips
---

If a disk analyzer shows `C:\Windows\WinSxS` as one of your biggest folders, you're not alone. It routinely sits at 6 GB or more, and it's tempting to delete it. **Don't.** Here's what it is and how to trim it safely.

## What WinSxS is

WinSxS is the **component store**. Windows keeps the files it needs to install updates, roll them back, enable optional features and repair itself. Deleting things in it by hand can break Windows Update and system repair.

## Why the size is misleading

Most files in WinSxS are **hard links** shared with the live `C:\Windows` folders. File Explorer counts those files twice, so the reported size is larger than the space actually used.

You can see the real numbers from an administrator Command Prompt or PowerShell:

```
Dism.exe /Online /Cleanup-Image /AnalyzeComponentStore
```

The report shows the size Explorer reports, the **actual size**, how much is shared with Windows, how much is reclaimable, and whether a cleanup is recommended.

## How to shrink it safely

If the report says cleanup is recommended, run:

```
Dism.exe /Online /Cleanup-Image /StartComponentCleanup
```

This removes superseded component versions the system no longer needs. You can also run **Disk Cleanup → Clean up system files → Windows Update Cleanup**.

## What to avoid

- Deleting files or folders inside `WinSxS` manually.
- Adding `/ResetBase` unless you're sure. It makes already-installed updates impossible to uninstall.

## The short version

WinSxS looks bigger than it is, and the supported tools (DISM and Disk Cleanup) are the only safe way to reduce it. Treat anything else in that folder as off limits.
