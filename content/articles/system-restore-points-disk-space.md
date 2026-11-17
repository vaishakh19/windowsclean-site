---
title: "System Restore points: how much disk space they use"
description: "Restore points use hidden disk space. How to check the storage they take, cap it and delete old points without losing your safety net."
date: 2026-11-17
category: Storage Tips
---

If your drive's used space doesn't add up, with folders totalling far less than the drive reports, **System Restore** may be part of the answer. Restore points live in a protected area that most tools can't show, and they can grow quietly.

## What restore points are

System Restore saves snapshots of system files, drivers and the registry so you can roll Windows back after a bad update or driver. The data is stored using the Volume Shadow Copy service in a protected folder called `System Volume Information` at the root of the drive.

Windows creates points before major changes such as a Windows update or driver install, and on a schedule if protection is enabled. Old points are discarded automatically when the allowed space is full.

## Why you can't see it in your disk usage

`System Volume Information` is protected. An analyzer running without administrator rights typically can't read inside it, and File Explorer won't show its size at all. The result is the classic mismatch: Windows says the drive is 90% full, while the folders you can see add up to far less.

## Check how much space they use

Open **Command Prompt (Admin)** or **Windows Terminal (Admin)**:

```
vssadmin list shadowstorage
```

Look at **Used Shadow Copy Storage space**, **Allocated Shadow Copy Storage space** and **Maximum Shadow Copy Storage space**.

You can also open **System Protection**: press **Win + R**, type `SystemPropertiesProtection`, select the drive and click **Configure**. The window shows the current usage and a slider for the maximum.

## Cap the space they can use

In the **Configure** dialog, move **Max Usage** to a sensible level, for example 3–5% of the drive on a large disk, or a few gigabytes on a small one. When the limit is reached, Windows deletes the oldest points.

Or from the command line:

```
vssadmin resize shadowstorage /for=C: /on=C: /maxsize=10GB
```

## Delete old restore points

Keep the newest point and remove the rest:

1. Press **Win + R**, type `cleanmgr`, pick the drive, then **Clean up system files**.
2. Open the **More Options** tab.
3. Under **System Restore and Shadow Copies**, click **Clean up**. This removes all but the most recent point.

Or from an admin prompt, delete only the oldest:

```
vssadmin delete shadows /for=C: /oldest
```

`vssadmin delete shadows /all` removes every point, including the latest. Only use it if you accept having no rollback.

## Should you turn System Restore off?

Usually not. A single restore point can save you from a driver or update that stops Windows booting, and the cost is a few gigabytes. Turning it off makes sense only on a very small drive, or if you have a full, tested backup and a recovery drive. **Restore points aren't backups:** they don't protect your documents or photos.

On some Windows 11 PCs, System Restore is off by default. Check the **System Protection** tab, and if the drive says **Off**, there is nothing to clean.

## Other hidden space users

A few other things behave like restore points, large but invisible to ordinary views:

- [`hiberfil.sys`](/articles/hiberfil-sys-explained/) and [`pagefile.sys`](/articles/pagefile-sys-explained/) in the drive root.
- [`WinSxS`](/articles/why-is-winsxs-so-big/), which appears bigger than it is.
- [`Windows.old`](/articles/windows-old-folder-delete/) after an upgrade.

The full list of safe actions is in [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).

## The short version

Restore points are stored in a protected folder that analyzers usually can't see. Check them with `vssadmin list shadowstorage`, cap them in **System Protection**, and delete old ones while keeping the latest.
