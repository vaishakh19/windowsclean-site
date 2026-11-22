---
title: "Sunburst vs treemap vs file list: which disk view to use"
description: "Sunburst for the big picture, treemap for finding the biggest items, file list for taking action. How each disk-usage view works and when to pick it."
date: 2026-11-04
category: Guides
---

Almost every disk space analyzer shows your drive in more than one way, and the choice is not cosmetic. Each view answers a different question. Pick the right one and you find the space hog in seconds. Pick the wrong one and you scroll for ten minutes.

Windows Clean offers three views of the same scan: **sunburst**, **treemap** and **file list**. Here is when to use each.

## Sunburst: understand the structure

A sunburst is a set of concentric rings. The centre is the folder you scanned. Each ring outward is one level deeper, and the width of every slice shows how much space that folder uses.

**Use it when:**

- You want a quick overview of a whole drive.
- You need to see *where* a large folder sits in the hierarchy, for example `Users → you → AppData → Local → ...`.
- You are explaining the result to someone else. It is the easiest view to read at a glance.

**Weak spot:** small folders become thin slivers that are hard to click. For that, switch views.

## Treemap: find the biggest items

A treemap fills a rectangle with nested boxes. Bigger files and folders get bigger boxes, and nothing is wasted on empty space, so you can compare hundreds of items at once.

**Use it when:**

- You want to spot the single biggest file or folder.
- You are hunting for outliers: a 30 GB video, a forgotten virtual machine disk, an old installer.
- You want to compare many folders of similar importance.

**Weak spot:** it does not show hierarchy as clearly as a sunburst, so you may need to drill down level by level.

## File list: take action

A file list is the plain table you already know from File Explorer: name, size, type, date, sorted any way you like.

**Use it when:**

- You are ready to act: sort by size, pick files and decide what to do.
- You need exact numbers instead of shapes.
- You are looking for a specific type or an old file.

In Windows Clean, the free version shows sizes and names. **Pro** adds full paths, file actions, deleting to the Recycle Bin and CSV export, so a list is also the best view for a cleanup report.

## A simple workflow

1. **Scan the drive** and start with the sunburst to see which top-level folders are heavy.
2. **Switch to the treemap** inside the heavy folder to find the largest individual items.
3. **Open the file list**, sort by size, and decide what to keep.
4. **Check before deleting.** If you are not sure what a folder is, read about it first. Folders such as [WinSxS](/articles/why-is-winsxs-so-big/) must never be deleted by hand.

## Which one should I pick?

| Your goal | Best view |
|---|---|
| "Where is my space going?" | Sunburst |
| "What is the biggest thing on this drive?" | Treemap |
| "Show me the 50 largest files I can delete" | File list |
| "Explain this to a colleague" | Sunburst |

## Frequently asked questions

### Which disk usage view is the most accurate?

All three views use the same scan data, so the sizes are identical. They only differ in how the numbers are drawn.

### Why use a visual view instead of File Explorer?

File Explorer needs you to open each folder and wait for it to calculate its size. A scan measures everything once, so you can see the whole drive in one picture.

### What should I do with what I find?

Start with the simple wins: the [Recycle Bin](/articles/recycle-bin-disk-space/), old downloads and [duplicate files](/articles/find-duplicate-files-windows/). Leave system folders alone unless a supported Windows tool handles them.
