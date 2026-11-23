---
title: "Windows Installer trop volumineux : que faire ?"
description: "Comprenez pourquoi C:\Windows\Installer grossit, les risques liés aux fichiers MSI et MSP et les méthodes prises en charge pour libérer de l’espace."
date: 2026-11-23
category: Windows Storage
---

**Si Windows Installer occupe trop de place, ne supprimez pas manuellement ses fichiers MSI ou MSP.** `C:\Windows\Installer` contient des éléments d’installation dont les logiciels peuvent avoir besoin plus tard. Un nom étrange ou une date ancienne ne signifie pas qu’un fichier est inutile.

Cherchez plutôt quelle application utilise cet espace et quelle opération prise en charge permet d’intervenir. Confirmez le chemin, puis examinez les logiciels installés. Ce guide concerne le cache d’installation ; [nettoyer Windows Update](/articles/clean-windows-update-files/) et [réduire WinSxS](/articles/why-is-winsxs-so-big/) sont des sujets distincts.

## À quoi sert ce dossier ?

Les programmes installés avec Windows Installer peuvent conserver des packages et correctifs nécessaires à leur maintenance. Ce cache n’est pas le fichier d’installation téléchargé dans Téléchargements. Supprimer une ancienne copie téléchargée et retirer les fichiers internes de maintenance n’ont pas les mêmes effets.

Microsoft avertit dans sa [documentation sur les fichiers de cache manquants](https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/missing-windows-installer-cache) que les problèmes peuvent n’apparaître qu’à la réparation, à la mise à jour ou à la désinstallation. Un logiciel qui démarre encore ne démontre pas que son cache était superflu.

Le dossier peut regrouper plusieurs produits et leurs mises à jour. Il n’existe ni taille normale universelle ni règle d’ancienneté garantissant une suppression sûre. Un ancien programme toujours utilisé peut encore dépendre de ses fichiers de maintenance.

## Confirmer le chemin exact

Plusieurs emplacements ont des noms proches mais des fonctions différentes :

| Emplacement | Fonction habituelle | Point de départ |
|---|---|---|
| `C:\Windows\Installer` | Cache d’installation des applications | Maintenance du logiciel |
| `C:\Windows\WinSxS` | Magasin de composants Windows | Nettoyage prévu par Windows |
| Téléchargements | Fichiers téléchargés par l’utilisateur | Examen des fichiers personnels |
| Cache propre à un logiciel | Données de travail spécifiques | Réglages ou documentation du produit |

Notez le chemin et la taille approximative. Si l’accès est refusé, ne changez pas le propriétaire ou les autorisations uniquement pour permettre le nettoyage. Une analyse sans élévation peut omettre du contenu protégé : son résultat ne représente pas forcément tout le stockage système.

## Examiner les applications installées

Sous Windows 11, ouvrez **Démarrer > Paramètres > Applications > Applications installées**. Sous Windows 10, utilisez **Paramètres > Applications > Applications et fonctionnalités**. Repérez les logiciels connus que vous n’utilisez plus, notamment les anciennes versions restées à côté des nouvelles.

Avant de désinstaller, sauvegardez les projets et conservez les informations de licence ou supports d’installation utiles. Fermez le logiciel, ouvrez son menu et choisissez **Désinstaller**. Certains programmes de bureau passent par **Panneau de configuration > Programmes > Programmes et fonctionnalités**.

Ce sont les [méthodes de désinstallation indiquées par Microsoft](https://support.microsoft.com/en-us/windows/apps/uninstall-or-remove-apps-and-programs-in-windows). Elles laissent l’installateur gérer ses ressources. Elles ne garantissent pas que le cache diminuera exactement de la taille affichée pour l’application : des composants partagés ou des particularités du produit peuvent intervenir.

## Le cas de $PatchCache$

Vous trouverez peut-être des conseils pour supprimer `C:\Windows\Installer\$PatchCache$` ou modifier une stratégie du registre. Il s’agit du fonctionnement de maintenance de l’installateur, pas d’un simple dossier temporaire.

Microsoft documente la stratégie [MaxPatchCacheSize](https://learn.microsoft.com/en-us/windows/win32/msi/maxpatchcachesize), liée à la conservation d’anciennes versions de fichiers lors de l’application de correctifs. L’existence d’un réglage documenté n’autorise pas pour autant à supprimer les dossiers présents. Les besoins de maintenance et l’accès aux sources d’installation restent importants.

Sur un ordinateur géré, demandez à l’administrateur ou à l’éditeur quelle procédure est prise en charge. Évitez les scripts génériques de suppression de MSI prétendument orphelins tant que le propriétaire du produit n’a pas identifié les fichiers réellement inutiles. Aucune commande de suppression massive n’est proposée ici.

## Récupérer de l’espace ailleurs

Si le manque d’espace est urgent, laissez Installer intact et examinez des catégories identifiables. Ouvrez **Paramètres > Système > Stockage > Fichiers temporaires**, puis vérifiez chaque sélection. Téléchargements peut contenir des données personnelles : ne cochez pas cette catégorie automatiquement.

Ensuite, [repérez les gros fichiers personnels](/articles/find-large-files-windows/), comme vidéos, archives et anciennes exportations. Déplacez ceux que vous souhaitez garder. Le [guide des fichiers temporaires](/articles/delete-temporary-files-windows/) distingue les outils prévus pour nettoyer de la suppression arbitraire de dossiers.

Windows Clean permet une analyse gratuite et hors connexion des fichiers accessibles, avec sunburst, treemap et liste de fichiers, sans compte ni droits administrateur. Utilisez ces vues pour enquêter. Un grand rectangle ne prouve pas qu’un fichier système est supprimable et ne remplace pas l’installateur du produit.

## Si des fichiers ont déjà été supprimés

Arrêtez les suppressions. Notez le logiciel concerné, le message d’erreur et les éléments retirés. Demandez à l’éditeur une méthode de réparation adaptée. Ne copiez pas des fichiers de noms similaires depuis un autre PC en supposant qu’ils correspondent.

Microsoft propose une [aide aux problèmes d’installation et de désinstallation](https://support.microsoft.com/en-us/windows/deployment/install-upgrade/fix-problems-that-block-programs-from-being-installed-or-removed). La récupération dépend du produit et des fichiers manquants ; relancer simplement l’application n’est pas toujours suffisant.

## Questions fréquentes

### Peut-on supprimer les anciens MSI et MSP ?

Le nom ou l’âge ne suffit pas pour le décider. Ils peuvent rester nécessaires aux réparations, mises à jour ou désinstallations. Utilisez la maintenance prise en charge par l’application.

### Nettoyage de disque vide-t-il entièrement Installer ?

Il ne faut pas compter dessus. Utilisez les catégories expressément proposées par Windows et laissez chaque installateur gérer ses fichiers de maintenance.

### Un dossier Installer volumineux indique-t-il un virus ?

La taille seule ne permet pas ce diagnostic. Identifiez les produits concernés et utilisez vos outils de sécurité pour une suspicion distincte, plutôt que de supprimer le cache.
