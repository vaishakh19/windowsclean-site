---
title: "Docker and WSL Disk Space on Windows: Safe Cleanup"
description: "Find what uses Docker and WSL disk space on Windows, review images and volumes, and understand why deleting Linux files may not shrink a VHDX."
date: 2026-11-23
category: Storage Tips
---

**Docker and WSL disk space has two layers: data inside Linux and the virtual disk file stored on Windows.** Removing unused images or Linux files can free space inside that virtual disk without immediately reducing its size on your C: drive. Deleting the VHDX file itself can destroy the environment.

Begin with read-only measurements. Establish whether Docker, a personal WSL distribution or ordinary Windows files account for the growth. If the location is unclear, first [find large files on Windows](/articles/find-large-files-windows/) and note their full paths before choosing a cleanup tool.

## Identify which system owns the storage

In PowerShell, list your distributions:

```powershell
wsl --list --verbose
```

This identifies installed distributions and their WSL version. WSL 2 uses virtual disks; WSL 1 uses a different storage architecture. Docker Desktop's storage layout also depends on its backend, installation history and version, so avoid assuming that every PC has the same `docker-desktop-data` distribution.

Microsoft's [WSL disk-space guide](https://learn.microsoft.com/en-us/windows/wsl/vhd-size) explains virtual disk capacity and how to locate a distribution's VHDX. Docker's [Windows backend documentation](https://docs.docker.com/desktop/features/wsl/) explains its relationship with WSL. Follow the documentation for your installation rather than moving files found through an old forum path.

## Measure Docker usage before removing anything

With Docker Desktop running, use:

```powershell
docker system df
docker system df -v
docker container ls -a
docker image ls
docker volume ls
```

These are inspection commands. The [Docker disk-usage reference](https://docs.docker.com/reference/cli/docker/system/df/) describes the summary and verbose output. Identify large images, stopped containers, build cache and volumes separately. “Reclaimable” is a technical classification, not a statement that the data has no value to you.

A stopped database container may still be part of a project you intend to resume. A volume not currently attached to a container may hold the only copy of a development database. Record which project owns each item and back up persistent data before considering removal.

## Prefer a narrow cleanup to a blanket prune

If you recognize a specific obsolete image or stopped container, remove it through Docker Desktop after inspecting its details. For dangling images, Docker provides:

```powershell
docker image prune
```

This is a deletion command. Read the confirmation and cancel if the scope is unclear. It is narrower than removing every unused image, but you should still understand what you can rebuild or download again.

The broader `docker system prune` also removes stopped containers, unused networks and unused build cache. Do not run it as an unexplained “fix disk space” command. Adding options such as `--all` or `--volumes` widens deletion further. Docker's [pruning guide](https://docs.docker.com/engine/manage-resources/pruning/) documents these distinctions; keep confirmation prompts enabled.

## Inspect a personal WSL distribution separately

Open the distribution you actually use, then run:

```bash
df -h /
du -h --max-depth=1 ~ 2>/dev/null
```

The first command reports filesystem usage. The second summarizes your home directory, not the entire Linux filesystem. It may reveal old project outputs, downloaded datasets or dependency caches. Large files outside your home directory require separate investigation.

Delete only material you recognize, using the owning application or package manager where appropriate. A Linux shell deletion normally does not go to the Windows Recycle Bin. Do not remove a working environment to chase a storage figure, and do not use `wsl --unregister` as a cleanup shortcut: it removes that distribution and its data.

## Why the VHDX may remain large

A dynamically expanding virtual disk can retain allocated host space after files inside it have been removed. Its maximum capacity, Linux's used-space figure and the physical Windows file size answer different questions. A large virtual capacity is not necessarily that much data physically occupying your SSD.

Compare the Windows drive's free space with the Linux and Docker measurements after cleanup. If host storage is still constrained, consult the current recovery or compaction guidance for your exact backend. Compaction is a separate maintenance task, not a reason to delete or rename the disk file.

Save work, back up valuable data and fully stop relevant workloads before any disk-maintenance procedure. `wsl --shutdown` stops running WSL environments, so do not use it while tasks are active. Avoid copying compaction commands that target a guessed VHD path.

## Prevent the same growth next month

Keep a short inventory of projects, their persistent volumes and disposable build outputs. Review old projects before removing shared resources. If you move an environment to a larger drive, use supported import, export or application settings rather than dragging its disk image in Explorer.

For ordinary Windows folders, see [AppData storage](/articles/appdata-folder-too-big/) and [moving files to another drive](/articles/move-files-to-another-drive-windows/). Windows Clean can locate large accessible host files with a free offline scan, without an account or administrator rights. It does not inspect the Linux filesystem inside a VHDX or compact Docker storage; use the owning tools for those jobs.

## Frequently asked questions

### Can I delete ext4.vhdx to recover space?

No, not if you want to keep that distribution's data. The file contains its Linux filesystem. Identify its owner and use supported cleanup or removal procedures after backing up.

### Why did docker system df improve but C: did not?

Docker's internal usage and the host disk allocation are different measurements. The virtual disk may retain allocated space, and backend-specific reclamation may be needed.

### Is a Docker volume safe to delete if it is unused?

Not automatically. It may contain persistent data from a stopped or removed project. Identify its contents and owner, then back up anything important before deletion.
