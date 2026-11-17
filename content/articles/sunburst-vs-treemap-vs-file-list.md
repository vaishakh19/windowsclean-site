---
title: "Sunburst vs Treemap vs File List: which view should you use?"
description: "When to use each disk-usage view: Sunburst for an overview, Treemap for finding the biggest items, File List for taking action."
date: 2026-11-04
category: Guides
---

Disk analyzers show the same scan in different views. Each view answers a different question, so choosing the right one makes a clean-up much faster. [Windows Clean](/) includes all three, and you can switch between them without rescanning.

## The three views at a glance

| View | Best question it answers | Strength | Weakness |
| --- | --- | --- | --- |
| **Sunburst** | "Where is my space going overall?" | Shows folder hierarchy as rings | Small items are hard to see |
| **Treemap** | "What are the biggest items?" | Area matches size, so large items stand out | Deep hierarchy is less obvious |
| **File List** | "What exactly should I delete?" | Exact names, sizes and paths | No visual overview |

## Sunburst: the overview

A sunburst is a set of concentric rings. The center is the scanned folder, and each ring outward is the next level of subfolders. The angle of each slice is its share of the parent's size.

Use it to:

- Get a first impression of a drive in seconds.
- See which top-level folders dominate, such as `Users`, `Program Files` or `Windows`.
- Follow one heavy branch, for example `Users → YourName → AppData → Local`, as far down as you want by clicking.

It is less useful for finding one specific huge file in a crowded folder, because very thin slices are hard to point at.

## Treemap: the biggest items

A treemap fills a rectangle with smaller rectangles, with each rectangle's area proportional to its size. Folders are grouped, so a big game install is a large block made of its own sub-blocks.

Use it to:

- Spot the largest files and folders at a glance.
- Compare sizes visually. A block twice as large uses twice the space.
- Find surprises such as a forgotten video export or a huge cache.

Treemaps are the better view when your question is "what is the single biggest thing?", which is the most common question on a full drive.

## File List: taking action

A list gives you rows with name, size and location, sorted however you like. It isn't pretty, but it is exact.

Use it to:

- **Confirm the full path** before you delete anything. See [find the biggest files on Windows](/articles/find-large-files-windows/).
- Sort by size, filter by type and work through candidates one by one.
- Review [duplicate files](/articles/find-duplicate-files-windows/) and decide which copy to keep.

In Windows Clean, full file paths and file actions are Pro features, and deleting sends files to the Recycle Bin by default after you confirm.

## A practical workflow

1. **Start with the sunburst** to see which top-level folders are heavy.
2. **Switch to the treemap** inside that folder to find the biggest items.
3. **Use the file list** to check names and paths, then decide what to remove.
4. **Delete in small batches** and check that your apps still work. Then empty the bin; see [Recycle Bin disk space](/articles/recycle-bin-disk-space/).

## Which view for which task

- **"My C drive is full and I don't know why."** Sunburst, then treemap. Also see [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).
- **"Which game should I uninstall?"** Treemap on the games folder. See the [gamer guide](/articles/gamer-guide-reclaim-game-space/).
- **"Delete the 20 biggest videos."** File list sorted by size.
- **"Why is `Users` so large?"** Sunburst on `Users`, then look inside [AppData](/articles/appdata-folder-too-big/).

## The short version

Sunburst for the big picture, treemap for the biggest items, file list for precise action. Use them in that order and the clean-up takes minutes instead of hours.
