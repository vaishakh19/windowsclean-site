---
title: "Clear Chrome and Edge Cache on Windows Safely"
description: "Clear Chrome and Edge cache on Windows without deleting passwords or downloaded files. Choose the right options and check actual space saved."
date: 2026-11-23
category: Storage Tips
---

**To clear Chrome or Edge cache on Windows, open the browser's browsing-data dialog and select Cached images and files.** Leave other categories unchecked unless you also intend to remove them. Cache, cookies, saved passwords and downloaded files are different things.

Cache cleanup can recover local storage and help with some page-loading problems. It is not a guaranteed way to recover a particular number of gigabytes or make every website faster. If the drive is nearly full, compare the browser's usage with other folders before deciding where to spend your time.

## Know what each option removes

| Category | What you are choosing to remove | Storage implication |
|---|---|---|
| Cached images and files | Reusable copies of web content | Browsing will build a new cache |
| Cookies and other site data | Site sessions and stored website data | Can sign you out or remove offline site data |
| Browsing history | Records of visited pages | Not the same as cached page content |
| Download history | The browser's list of downloads | Does not delete the downloaded files |
| Password-related options | Saved credentials, where offered | Not necessary for ordinary cache cleanup |

Google explains these categories in its [browsing-data documentation](https://support.google.com/chrome/answer/2392709?hl=en&co=GENIE.Platform%3DDesktop). Treat every checkbox as a separate decision. Avoid selecting all options simply because the dialog makes that easy.

## Clear the cache in Chrome

1. Open the Chrome profile whose cache you want to clear.
2. Open the three-dot menu and select **Delete browsing data**.
3. Choose the time range. **All time** covers the full available range; a shorter period is useful for recent problems.
4. Select **Cached images and files**. Review and clear other selections if you want cache-only cleanup.
5. Select **Delete data** and allow the operation to finish.

Chrome's wording and layout can change between versions. If you cannot find the entry, search Chrome's settings for browsing data. Google's [cache and cookies help page](https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop) describes the current dialog, but you do not need to clear cookies just because the help page discusses both categories.

Before starting, save unfinished work in web applications. Afterward, reopen a familiar page and check it loads correctly. It may initially load more slowly while images and other resources are fetched again.

## Clear the cache in Microsoft Edge

In Edge, press **Ctrl + Shift + Delete** to open the browsing-data controls. Microsoft lists this shortcut in its [Edge keyboard reference](https://support.microsoft.com/en-us/edge/keyboard-shortcuts-in-microsoft-edge).

Choose a time range, select **Cached images and files**, and review every other selected category before choosing **Clear now** or the equivalent confirmation button. The settings route is through **Settings > Privacy, search, and services**, where the browsing-data controls are located; labels may vary with the release.

Microsoft's [cookie management guidance](https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use) explains the separate consequences of deleting cookies. If your only aim is storage used by cached page resources, leave cookies and site data alone unless you have a specific reason to clear them.

## Check the right profile and storage location

People who use work and personal profiles may have several browser data folders. Clearing one profile's cache is not a promise that all profiles have been cleaned. Open each profile intentionally, and avoid changing a managed work profile's settings without understanding its requirements.

Do not delete the entire `User Data` folder under Chrome or Edge to save space. It contains much more than cache. Browsers and extensions can also store data outside the category you just cleared, so a remaining large profile does not prove the cleanup failed.

Use [our AppData guide](/articles/appdata-using-space/) to understand the surrounding folder structure. If a website stores a large offline library, review that site's own storage controls and make sure you can recover important offline work before removing site data.

## Measure the result without chasing an exact number

Open **File Explorer > This PC**, right-click the affected drive and choose **Properties**. Note free space before and after cleanup. Close browser tabs you do not need while comparing; downloads, updates and other running apps can change the result at the same time.

For an overview, Windows Clean offers free offline scanning with sunburst, treemap and file-list views, no account and no administrator rights. Use it to see whether the browser is actually a major storage consumer. It is not a replacement for the browser's profile-aware cleanup controls.

If the main storage is in Downloads, clearing the cache will not solve that problem. [Review old downloads](/articles/delete-old-downloads-windows/) separately. For other Windows-managed temporary data, follow the [temporary-file cleanup guide](/articles/delete-temporary-files-windows/).

## Avoid unnecessary repeated cleanup

A cache is useful: it avoids downloading the same resources every visit. Clearing it every day can increase downloads and slow initial page loads without fixing the underlying reason a drive is full.

Use cleanup when you have a measured storage problem or a troubleshooting reason. If space drops rapidly again, identify the growing folder or application rather than repeating the same deletion. Keep useful offline content and concentrate on the category that actually accounts for the loss.

## Frequently asked questions

### Will clearing cached images and files delete passwords?

That category is separate from saved credentials. Check the dialog carefully and leave password-related and other unwanted categories unselected. Do not choose a broad profile reset.

### Will clearing download history remove files from Downloads?

No. It removes the browser's download records, not the saved files. Review the Downloads folder separately before deleting anything you want to keep.

### Why does the browser cache grow again?

It stores reusable content as you browse. Some growth is normal. If the profile becomes unexpectedly large, distinguish cache from extensions, site storage and actual downloads.
