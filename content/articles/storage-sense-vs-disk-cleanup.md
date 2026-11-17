---
title: "Storage Sense vs Disk Cleanup: which should you use?"
description: "Storage Sense and Disk Cleanup both free space on Windows. What each one does, the settings worth changing, and where analyzers fit in."
date: 2026-11-17
category: Guides
---

Windows ships with two built-in cleaners: the older **Disk Cleanup** (`cleanmgr`) and the newer **Storage Sense**. They overlap, which confuses people. Here is what each is for and how to set them up.

## The short comparison

| | Storage Sense | Disk Cleanup |
| --- | --- | --- |
| Where | Settings → System → Storage | `cleanmgr` |
| Runs automatically | Yes, on a schedule or when space is low | No, manual |
| Handles Recycle Bin and Downloads rules | Yes, by age | Manual |
| Cleans system files such as previous Windows installs | Via Temporary files | **Clean up system files** button |
| Status | Current, actively developed | Legacy; Microsoft has flagged it for eventual replacement |

## Storage Sense

Storage Sense runs in the background and removes things Windows considers safe: temporary files that apps aren't using, and, if you choose, old Recycle Bin and Downloads content.

### How to turn it on

1. Open **Settings → System → Storage**.
2. Turn on **Storage Sense**.
3. Click it to open the settings.

### Settings worth knowing

- **Run Storage Sense:** every day, every week, every month, or only when free space is low. "During low free disk space" is the default.
- **Delete files in my Recycle Bin if they have been there for over:** Never, 1, 14, 30 or 60 days. Thirty days is a sensible choice. See [Recycle Bin disk space](/articles/recycle-bin-disk-space/).
- **Delete files in my Downloads folder if they have been there for over:** this is **Never** by default, and it should stay that way unless you are sure you keep nothing important there. Files deleted by age skip your review.
- **Locally available cloud content** (OneDrive): can turn files that haven't been opened for a while into online-only. That frees space but means they need a connection to open.

You can also click **Run Storage Sense now** to test it.

## Disk Cleanup

Disk Cleanup is still available and still useful for one reason: the **Clean up system files** button, which offers items such as previous Windows installations and Windows Update Cleanup. Windows Settings has similar options under **Temporary files**, so you can usually do the same thing without it.

### How to open it

Press **Win + R**, type `cleanmgr`, pick the drive, then click **Clean up system files** and tick what you want removed. Read each description. **Downloads** and **Recycle Bin** are in the list, so untick them if you haven't checked them.

## Which should you use?

- **Storage Sense** for routine maintenance. Set it once.
- **Settings → Temporary files** for a one-time clean-up of system items. It is the same job as Disk Cleanup with a newer interface.
- **Disk Cleanup** if you prefer the classic dialog or find options that your Windows build only shows there.

## What neither tool can do

Both clean from Microsoft's list of known safe categories. They **don't tell you what is using your space** and they won't find:

- A 40 GB game you stopped playing.
- A forgotten folder of video exports.
- Duplicate photos and backups.
- Large files in places Windows doesn't consider temporary.

For that, you need a tool that shows the contents of the drive. See [how to find the biggest files](/articles/find-large-files-windows/), [how to find duplicate files](/articles/find-duplicate-files-windows/), or open the drive in [Windows Clean](/) as a sunburst or treemap, which is explained in [Sunburst vs Treemap vs File List](/articles/sunburst-vs-treemap-vs-file-list/).

## A good setup

1. Turn on Storage Sense, with the Recycle Bin at 30 days and Downloads on **Never**.
2. Once or twice a year, run a disk analyzer to find what the built-in tools miss.
3. Do the one-off system cleanups (`Windows.old`, restore points) only when you need the space. See [C drive full? 10 safe ways to free space](/articles/c-drive-full-windows/).

## The short version

Storage Sense is the automatic housekeeper; Disk Cleanup is the old manual tool with the useful system-files button. Neither shows you what is big, so use an analyzer for that.
