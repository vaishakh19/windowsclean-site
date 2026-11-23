---
title: "Vider le cache de Chrome et Edge sous Windows"
description: "Videz le cache de Chrome et Edge sans supprimer vos mots de passe ni vos téléchargements. Choisissez les bonnes options et mesurez le gain réel."
date: 2026-11-23
category: Storage Tips
---

**Pour vider le cache de Chrome ou Edge, ouvrez les options de suppression des données de navigation et sélectionnez Images et fichiers en cache.** Décochez les autres catégories si vous souhaitez les conserver. Cache, cookies, mots de passe et fichiers téléchargés sont des données différentes.

L’opération peut récupérer de l’espace et résoudre certains problèmes d’affichage. Elle ne garantit ni un nombre précis de gigaoctets ni une navigation toujours plus rapide. Si le lecteur est presque plein, mesurez d’abord la place du navigateur par rapport aux autres dossiers.

## Comprendre les catégories

| Catégorie | Ce qui est retiré | Conséquence |
|---|---|---|
| Images et fichiers en cache | Copies réutilisables de contenu web | Le cache se reconstruit en naviguant |
| Cookies et autres données de sites | Sessions et stockage des sites | Déconnexions ou perte de données hors ligne possibles |
| Historique de navigation | Liste des pages consultées | Distinct des ressources de pages |
| Historique des téléchargements | Liste conservée par le navigateur | Les fichiers téléchargés restent sur le PC |
| Options de mots de passe | Identifiants, selon le dialogue | Inutile pour un simple nettoyage du cache |

Google décrit ces différences dans sa [documentation des données de navigation](https://support.google.com/chrome/answer/2392709?hl=en&co=GENIE.Platform%3DDesktop). Chaque case représente une décision. Ne sélectionnez pas tout uniquement parce que le dialogue le permet.

## Vider le cache dans Chrome

1. Ouvrez le profil Chrome concerné.
2. Dans le menu à trois points, choisissez **Supprimer les données de navigation**.
3. Sélectionnez une période. **Toutes les données** couvre l’ensemble disponible ; une période courte convient aux problèmes récents.
4. Cochez **Images et fichiers en cache** et vérifiez les autres sélections.
5. Cliquez sur **Supprimer les données** et attendez la fin.

Les libellés et la disposition peuvent évoluer. Si l’entrée est absente, recherchez les données de navigation dans les paramètres. L’[aide sur le cache et les cookies](https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop) présente le dialogue, mais vous n’êtes pas obligé d’effacer les cookies simplement parce qu’ils figurent dans le même article.

Enregistrez d’abord les travaux en cours dans les applications web. Rouvrez ensuite une page connue pour vérifier son fonctionnement. Le premier chargement peut être plus lent, le temps de télécharger de nouveau images et autres ressources.

## Vider le cache dans Microsoft Edge

Appuyez sur **Ctrl + Shift + Delete** pour ouvrir les options de suppression. Microsoft répertorie ce raccourci dans sa [documentation du clavier Edge](https://support.microsoft.com/en-us/edge/keyboard-shortcuts-in-microsoft-edge).

Choisissez une période et **Images et fichiers mis en cache**, puis examinez les autres cases avant de cliquer sur **Effacer maintenant** ou le bouton équivalent. Le chemin passe aussi par **Paramètres > Confidentialité, recherche et services**, où se trouvent les contrôles des données de navigation. Les noms peuvent varier selon la version.

Le [guide Microsoft sur les cookies](https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use) explique les effets propres à leur suppression. Si vous visez seulement les ressources web en cache, conservez cookies et données de sites, sauf besoin précis.

## Vérifier le profil concerné

Des profils personnels et professionnels peuvent avoir des dossiers distincts. Nettoyer l’un ne nettoie pas automatiquement tous les autres. Ouvrez chaque profil volontairement et respectez les restrictions d’un profil géré par l’entreprise.

Ne supprimez pas entièrement le dossier `User Data` de Chrome ou Edge. Il contient bien plus que le cache. Extensions et sites peuvent également stocker des données ailleurs que dans la catégorie effacée ; un profil encore volumineux ne prouve pas un échec.

Notre [guide AppData](/articles/appdata-using-space/) explique ces emplacements. Si un site conserve une bibliothèque hors connexion, utilisez ses propres contrôles et assurez-vous de pouvoir récupérer le travail important avant d’effacer ses données. Un espace de travail web n’est pas nécessairement jetable.

## Mesurer le gain réel

Dans **Explorateur de fichiers > Ce PC**, ouvrez les **Propriétés** du lecteur concerné. Notez l’espace libre avant et après. Fermez les onglets inutiles : téléchargements, mises à jour et autres applications peuvent modifier simultanément la mesure.

Windows Clean propose une analyse gratuite et hors connexion des fichiers accessibles avec sunburst, treemap et liste de fichiers, sans compte ni droits administrateur. Elle aide à déterminer si le navigateur occupe réellement une place importante. Elle ne remplace pas les contrôles de nettoyage propres à chaque profil.

Si l’essentiel est dans Téléchargements, vider le cache ne résoudra pas le problème. [Examinez les anciens téléchargements](/articles/delete-old-downloads-windows/) séparément. Pour les données temporaires gérées par Windows, suivez le [guide des fichiers temporaires](/articles/delete-temporary-files-windows/).

## Éviter les nettoyages systématiques

Le cache évite de télécharger les mêmes ressources à chaque visite. Le vider quotidiennement peut accroître les transferts et ralentir les premières ouvertures sans résoudre la cause du manque d’espace.

Intervenez pour un problème mesuré de stockage ou de fonctionnement. Si l’espace baisse rapidement de nouveau, repérez le dossier qui grandit. Préservez les contenus hors connexion utiles et ciblez la catégorie responsable au lieu de répéter la même suppression.

## Questions fréquentes

### Vider le cache efface-t-il les mots de passe ?

La catégorie Images et fichiers en cache est séparée des identifiants. Vérifiez les sélections et ne cochez pas les données que vous souhaitez conserver. Évitez une réinitialisation complète du profil.

### L’historique des téléchargements contient-il les fichiers ?

Non. Supprimer cet historique retire les entrées du navigateur, pas les fichiers enregistrés. Examinez le dossier Téléchargements indépendamment.

### Pourquoi le cache grossit-il à nouveau ?

Le navigateur mémorise des ressources réutilisables pendant la navigation. C’est normal. En cas de croissance inhabituelle, distinguez cache, extensions, stockage des sites et téléchargements réels.
