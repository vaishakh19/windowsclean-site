---
title: "OneDrive : libérer de l’espace avec Fichiers à la demande"
description: "Libérez de l’espace local avec OneDrive sans supprimer vos fichiers du cloud. Vérifiez les icônes, la synchronisation et la disponibilité hors connexion."
date: 2026-11-23
category: Windows Storage
---

**Pour libérer de l’espace local avec OneDrive, faites un clic droit sur un fichier synchronisé et choisissez Libérer de l’espace. Ne choisissez pas Supprimer.** Le contenu peut rester uniquement dans le cloud, tandis que son nom demeure visible dans l’Explorateur. Une connexion sera nécessaire pour le rouvrir.

Cette distinction est utile lorsque Documents ou Images remplit un ordinateur portable. Avant de modifier des dossiers entiers, identifiez les fichiers téléchargés et ceux dont vous aurez besoin hors connexion. Si OneDrive n’est pas clairement en cause, commencez par [repérer les fichiers volumineux](/articles/find-large-files-windows/).

## Comprendre les trois états OneDrive

Ouvrez le dossier OneDrive dans l’Explorateur et consultez la colonne Statut. La [documentation de Fichiers à la demande](https://support.microsoft.com/en-us/onedrive/save-disk-space-with-onedrive-files-on-demand-for-windows) distingue trois états :

| Icône | Signification | Usage adapté |
|---|---|---|
| Nuage bleu | Contenu uniquement en ligne | Archives rarement consultées |
| Coche verte dans un cercle vide | Fichier téléchargé, disponible localement | Documents ouverts récemment |
| Cercle vert plein avec coche blanche | Toujours conservé sur cet appareil | Travail nécessaire sans internet |

Un nom visible ne prouve pas que tout le contenu est présent sur le disque. Ouvrir un fichier en ligne le télécharge. Choisissez sa disponibilité selon votre usage, plutôt que de rendre toute une bibliothèque uniquement accessible en ligne d’un seul coup.

## Vérifier la synchronisation avant d’agir

Cliquez sur l’icône OneDrive dans la zone de notification. Résolvez les pauses, erreurs de transfert et problèmes de connexion au compte. Pour un document important, ouvrez OneDrive dans le navigateur et vérifiez que la version attendue est bien présente.

Fermez les applications qui utilisent les fichiers concernés. Commencez par un dossier d’archives plutôt qu’un projet actif. D’anciennes vidéos exportées sont de bons candidats ; la présentation du lendemain et ses médias liés doivent rester disponibles pendant un déplacement.

La synchronisation ne remplace pas une sauvegarde indépendante. Les modifications et suppressions peuvent se propager. Conservez une autre copie du travail irremplaçable, notamment avant de réorganiser une collection importante.

## Rendre un dossier disponible uniquement en ligne

1. Appuyez sur **Win + E** et ouvrez le bon dossier OneDrive.
2. Sélectionnez un fichier ou dossier entièrement synchronisé dont vous n’avez pas besoin hors connexion.
3. Faites un clic droit et choisissez **Libérer de l’espace**.
4. Attendez la fin du changement, puis vérifiez l’icône de nuage.
5. Dans **Ce PC**, ouvrez les **Propriétés** du lecteur pour comparer l’espace libre.

Procédez d’abord sur un petit ensemble. Si vous ouvrez immédiatement les fichiers pour les vérifier, ils seront téléchargés de nouveau. Utilisez le site de OneDrive lorsqu’il suffit de confirmer la copie dans le cloud. Le gain varie selon les fichiers déjà locaux et l’activité du PC.

Si la commande manque, vérifiez que l’élément appartient bien au dossier synchronisé. Consultez **Paramètres OneDrive > Synchronisation et sauvegarde > Paramètres avancés** pour les contrôles de Fichiers à la demande. Leur emplacement ou disponibilité peut varier selon la version et les règles de votre organisation.

## Garder les documents essentiels hors connexion

Pour les documents indispensables en déplacement, choisissez **Toujours conserver sur cet appareil**. Attendez la fin des téléchargements et vérifiez le cercle vert plein avant de quitter une connexion fiable.

Évitez de marquer un énorme dossier parent si vous ne voulez que quelques fichiers. Cette sélection peut télécharger tout son contenu et annuler le gain espéré. Un petit dossier de travail local associé à une grande archive en ligne est plus simple à maîtriser.

Microsoft décrit également [l’intégration de OneDrive avec l’Assistant Stockage](https://support.microsoft.com/en-us/onedrive/use-onedrive-and-storage-sense-in-windows-10-to-manage-disk-space). Examinez ses réglages pour le contenu cloud avant d’automatiser les changements. Consultez aussi [Assistant Stockage ou Nettoyage de disque](/articles/storage-sense-vs-disk-cleanup/).

## Libérer de l’espace n’est pas supprimer

Supprimer un fichier dans un dossier synchronisé peut également le supprimer de OneDrive et des autres appareils. Libérer de l’espace modifie sa disponibilité locale. La Corbeille n’est donc pas le bon outil pour conserver la copie en ligne et retirer seulement son téléchargement.

Cette action ne réduit pas non plus l’espace occupé dans votre quota OneDrive. Si le compte cloud est plein, il faut examiner ce que vous conservez dans ce compte. La [documentation sur les suppressions OneDrive](https://support.microsoft.com/en-us/onedrive/delete-files-or-folders-in-onedrive) distingue les situations.

## Mesurer l’espace réellement occupé

Les fichiers représentés par des espaces réservés peuvent afficher une **Taille** supérieure à la **Taille sur le disque**. Microsoft explique ces [écarts de taille](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match). Comparez l’espace libre du lecteur plutôt que de considérer toute la taille du dossier comme récupérable.

Windows Clean examine les dossiers accessibles avec un sunburst, un treemap et une liste de fichiers. L’analyse est gratuite, hors connexion, sans compte et sans droits administrateur. Elle ne modifie pas la disponibilité OneDrive : utilisez les commandes de OneDrive. Pour d’autres fichiers personnels trop volumineux, envisagez de [les déplacer sur un autre lecteur](/articles/move-files-to-another-drive-windows/).

## Questions fréquentes

### Libérer de l’espace supprime-t-il mes fichiers OneDrive ?

Cette commande rend le contenu synchronisé uniquement disponible en ligne sur ce PC. Vérifiez auparavant que la synchronisation est terminée et que la copie importante existe dans le cloud.

### Pourquoi les fichiers prennent-ils de nouveau de la place ?

Ouvrir un fichier en ligne le télécharge. Toujours conserver sur cet appareil télécharge aussi le contenu. Vérifiez l’état du fichier et celui du dossier parent.

### Peut-on ouvrir un fichier en ligne sans internet ?

Non. Téléchargez les documents nécessaires à l’avance et conservez les plus importants sur l’appareil. Attendez la fin des téléchargements avant de vous déconnecter.
