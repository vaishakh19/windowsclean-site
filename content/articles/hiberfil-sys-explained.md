---
title: "What is hiberfil.sys and can you delete it?"
description: "hiberfil.sys can take up many GB on the C drive. What it does, how Fast Startup depends on it, and how to shrink or remove it with powercfg."
date: 2026-11-17
category: Storage Tips
---

If you analyze your C drive and see a hidden file called `hiberfil.sys` using several gigabytes, you are looking at the **hibernation file**. You can't delete it like a normal file, but you can control it.

## What hiberfil.sys does

When a PC hibernates, Windows writes the contents of memory to `C:\hiberfil.sys`, powers off completely, and reads it back when you start the PC. Your open apps and documents return exactly as you left them.

The same file is used by **Fast Startup**, the default shutdown behaviour on many Windows 10 and 11 PCs. With Fast Startup, "Shut down" saves a part of the system state to the file so the next boot is quicker.

## How big is it?

By default Windows sizes the file at roughly **40% of your installed RAM**. A PC with 16 GB of RAM can have a hibernation file of around 6 GB; one with 32 GB can reach 13 GB. The file is hidden and protected, so you won't see it in File Explorer unless you show protected operating system files. A [disk analyzer](/articles/best-disk-space-analyzers-windows/) shows it directly.

## Should you remove it?

Disable hibernation if all of these are true:

- You never use **Hibernate**.
- You are fine losing **Fast Startup** (the speed difference on an SSD is small for most people).
- You need the space.

Keep it if you use hibernate on a laptop to preserve your session over days, or if you rely on the faster boot.

## How to turn hibernation off

Open **Windows Terminal (Admin)**, Command Prompt (Admin) or PowerShell (Admin) and run:

```
powercfg /h off
```

`hiberfil.sys` is removed and the **Hibernate** and **Fast Startup** options disappear from the power menu and power settings.

## How to make it smaller instead

If you want Fast Startup but not full hibernation, you can use the reduced type:

```
powercfg /h /type reduced
```

This keeps Fast Startup but disables full hibernate, which makes the file smaller. To go back to the full file:

```
powercfg /h /type full
```

## How to turn it back on

```
powercfg /h on
```

The file returns at its default size.

## Common questions

**Is it safe to delete `hiberfil.sys` by right-clicking it?** Windows won't allow it, and you shouldn't try to force it. Use `powercfg`.

**Will disabling it speed up my PC?** It frees space; it doesn't make a running PC faster. Boot time may be slightly slower without Fast Startup.

**Will it come back after a Windows update?** Updates keep your power settings. If it returns, check that hibernate is still off with `powercfg /a`, which lists the sleep states your PC supports.

## Related files in the drive root

You may see two other large hidden files next to it. They work differently, and neither should be deleted: `pagefile.sys` is explained in [what is pagefile.sys](/articles/pagefile-sys-explained/), and for broader cleaning see [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).

## The short version

`hiberfil.sys` stores your session for hibernate and Fast Startup, usually about 40% of RAM. If you don't use either, `powercfg /h off` from an administrator prompt gives the space back.
