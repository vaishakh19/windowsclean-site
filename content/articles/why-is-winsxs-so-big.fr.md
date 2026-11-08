---
title: "Pourquoi le dossier WinSxS est-il si volumineux, et peut-on le nettoyer ?"
description: "WinSxS affiche souvent 6 Go ou plus dans l'Explorateur. Ce qu'il contient, pourquoi sa taille est trompeuse et comment le réduire sans risque avec DISM."
date: 2026-11-06
category: Astuces stockage
---

Si un analyseur d'espace disque indique `C:\Windows\WinSxS` parmi vos plus gros dossiers, vous n'êtes pas seul. Il atteint souvent 6 Go ou plus, et la tentation de le supprimer est grande. **Ne le faites pas.** Voici ce que c'est et comment le réduire en toute sécurité.

## Ce qu'est WinSxS

WinSxS est le **magasin de composants**. Windows y conserve les fichiers nécessaires pour installer et annuler les mises à jour, activer des fonctionnalités facultatives et se réparer lui-même. Supprimer des éléments à la main peut casser Windows Update et la réparation du système.

## Pourquoi la taille est trompeuse

La plupart des fichiers de WinSxS sont des **liens physiques** partagés avec les dossiers actifs de `C:\Windows`. L'Explorateur de fichiers compte ces fichiers deux fois, la taille affichée est donc supérieure à l'espace réellement utilisé.

Vous pouvez voir les vrais chiffres depuis une invite de commandes ou PowerShell en administrateur :

```
Dism.exe /Online /Cleanup-Image /AnalyzeComponentStore
```

Le rapport indique la taille affichée par l'Explorateur, la **taille réelle**, la part partagée avec Windows, l'espace récupérable et si un nettoyage est recommandé.

## Comment le réduire en sécurité

Si le rapport recommande un nettoyage, exécutez :

```
Dism.exe /Online /Cleanup-Image /StartComponentCleanup
```

Cela supprime les versions de composants remplacées dont le système n'a plus besoin. Vous pouvez aussi utiliser le **Nettoyage de disque → Nettoyer les fichiers système → Nettoyage de Windows Update**.

## À éviter

- Supprimer à la main des fichiers ou dossiers dans `WinSxS`.
- Ajouter `/ResetBase` sans en être sûr. Les mises à jour déjà installées ne pourront alors plus être désinstallées.

## En bref

WinSxS paraît plus gros qu'il ne l'est, et les outils pris en charge (DISM et le Nettoyage de disque) sont le seul moyen sûr de le réduire. Considérez tout le reste de ce dossier comme interdit.
