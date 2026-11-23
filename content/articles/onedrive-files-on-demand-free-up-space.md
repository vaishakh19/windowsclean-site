---
title: "OneDrive Files On-Demand: Free Up Space on Windows"
description: "Use OneDrive Files On-Demand to free local disk space without deleting cloud files. Understand status icons, offline access and sync checks."
date: 2026-11-23
category: Windows Storage
---

**To free local disk space with OneDrive Files On-Demand, right-click a synced file or folder and choose Free up space. Do not choose Delete.** The file stays in OneDrive, while its downloaded content can be removed from your PC. You will need an internet connection to open it again.

That distinction matters when a large Documents or Pictures folder fills a laptop. This guide explains how to choose suitable files, verify the result, and keep important work available offline. If you are not sure OneDrive is the cause, first [find the largest files on your drive](/articles/find-large-files-windows/).

## Understand the three OneDrive states

In File Explorer, open your OneDrive folder and look at the Status column. Microsoft distinguishes these states in its [Files On-Demand documentation](https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows).

| Status | What it means | Useful for |
|---|---|---|
| Blue cloud | Online-only; content downloads when opened | Archives you rarely need |
| Outlined green check | Downloaded and currently available locally | Files you recently opened |
| Solid green circle with white check | Always kept on this device | Work you need without internet |

A visible filename is not proof that the complete file is stored locally. Conversely, opening an online-only file downloads it and increases local storage use. Choose a file's state according to how you use it, rather than making every folder online-only at once.

## Check syncing before reclaiming space

Click the OneDrive cloud icon in the Windows notification area. Resolve sign-in problems, paused syncing and upload errors before changing file availability. If a document is important, open OneDrive in your browser and confirm that the expected version is present there.

Close applications using the files you intend to change. Start with an archive folder rather than an active project. For example, last year's exported videos may be good candidates; tomorrow's presentation, reference images and linked media should remain available for travel.

Cloud syncing is not the same as an independent backup. Changes and deletions can propagate. Keep a separate backup for irreplaceable work, particularly before reorganizing a large collection.

## Make a folder online-only

1. Press **Win + E** and open the relevant OneDrive folder.
2. Select a fully synced file or folder you do not need offline.
3. Right-click and select **Free up space**. Menu wording follows your Windows language.
4. Let OneDrive finish changing availability, then check for the cloud status icon.
5. Open **This PC**, right-click the affected drive and select **Properties** to compare free space.

Try a small batch first. If you immediately open the files to test them, they download again, so use OneDrive's website when you only need to confirm that a cloud copy exists. Do not expect an exact, fixed saving: file size, existing online-only items and other activity affect the result.

If the command is missing, confirm you selected an item inside the synced OneDrive location. Check **OneDrive settings > Sync and back up > Advanced settings** for Files On-Demand controls; availability and wording can vary by version or organizational policy. A work-managed PC may require help from its administrator.

## Keep essential files available offline

For material you need without a connection, right-click and select **Always keep on this device**. Wait for downloading to finish before leaving reliable internet access. Verify the solid green status icon, not just the presence of a filename.

Keep this selection focused. Marking a large parent folder as always available can download its contents and undo the storage saving you wanted. A useful arrangement is a small offline working folder alongside a larger online archive.

Microsoft also documents [OneDrive's integration with Storage Sense](https://support.microsoft.com/en-us/onedrive/use-onedrive-and-storage-sense-in-windows-10-to-manage-disk-space). Review its cloud-content settings before enabling automation. For the wider difference between Windows cleanup tools, see [Storage Sense versus Disk Cleanup](/articles/storage-sense-vs-disk-cleanup/).

## Why deleting is a different action

Deleting an item from a synced OneDrive folder can remove it from OneDrive and other synced devices. **Free up space** changes local availability instead. If your goal is to keep the cloud copy, do not use the Recycle Bin as a substitute.

Likewise, freeing local space does not reduce your OneDrive cloud-storage quota. If the online account is full, that is a separate problem involving what you retain in the account. Microsoft's [OneDrive deletion guide](https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive) explains the distinction.

## Measure local storage, not just folder size

OneDrive placeholders can make a folder's reported **Size** much larger than **Size on disk**. Microsoft explains these [OneDrive size differences](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match). Compare drive free space before and after the change rather than assuming every displayed gigabyte is locally reclaimable.

Windows Clean can help you inspect accessible folders with its sunburst, treemap or file list. Scanning is free, offline, requires no account and needs no administrator rights. It does not change OneDrive availability for you; use OneDrive's own controls. If local personal files remain too large, consider [moving files to another drive](/articles/move-files-to-another-drive-windows/).

## Frequently asked questions

### Does Free up space delete my OneDrive files?

It makes synced content online-only on this PC. It does not mean Delete. Check that syncing has completed and that important cloud copies are available first.

### Why did my OneDrive files use space again?

Opening online-only files downloads them. Selecting Always keep on this device also downloads content. Review file status and any parent folder set to stay offline.

### Can I open online-only files without internet?

No. Download the files you need beforehand and mark essential work as always available. Wait for syncing and downloading to complete before disconnecting.
