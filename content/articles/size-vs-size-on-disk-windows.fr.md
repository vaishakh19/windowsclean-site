---
title: "Taille et taille sur le disque : pourquoi cet écart ?"
description: "Comprenez les écarts de taille sous Windows : unités d’allocation, fichiers OneDrive et liens physiques. Vérifiez les mesures avant toute suppression."
date: 2026-11-23
category: Storage Tips
---

**La taille correspond à la longueur logique du fichier ; la taille sur le disque décrit l’espace alloué selon le système de fichiers et l’outil.** Les deux valeurs peuvent différer. Les unités d’allocation peuvent augmenter l’occupation, tandis que compression, fichiers épars et espaces réservés du cloud peuvent la réduire.

Une autre comparaison doit rester distincte : la somme des dossiers visibles face à l’espace utilisé du lecteur entier. Permissions, métadonnées et données partagées peuvent intervenir. Un écart ne démontre pas une panne de Windows ni la présence d’autant de fichiers inutiles à supprimer.

## Comparer des mesures équivalentes

Faites un clic droit sur un fichier local ordinaire, ouvrez **Propriétés** et comparez **Taille** et **Taille sur le disque**. Commencez par un fichier avant d’examiner un dossier contenant des milliers d’éléments différents.

Notez son chemin, les unités affichées et son éventuelle appartenance à OneDrive ou à une machine virtuelle. Vérifiez que l’analyseur et l’Explorateur examinent le même périmètre. Le profil utilisateur et le lecteur C: entier ne représentent pas la même chose.

| Observation | Explication possible | Vérification utile |
|---|---|---|
| Allocation légèrement supérieure | Arrondi aux unités d’allocation | Nombreux petits fichiers |
| Taille logique beaucoup plus grande | Cloud, compression ou fichiers épars | État et type de stockage |
| Somme des dossiers trop élevée | Données partagées par des liens | Méthode de comptage |
| Lecteur plus occupé que les dossiers visibles | Contenu protégé ou métadonnées | Accès et stockage système |

Ce tableau sert au diagnostic, pas à choisir quoi supprimer. Pour trouver ensuite des candidats compréhensibles, consultez [la recherche des gros fichiers](/articles/find-large-files-windows/).

## Le rôle des unités d’allocation

Les systèmes de fichiers allouent l’espace par unités, souvent appelées clusters. Pour un fichier ordinaire, non résident et non compressé, une unité partiellement remplie peut tout de même être allouée en entier. Avec beaucoup de petits fichiers, l’écart cumulé devient visible.

Exemple simplifié : avec des unités de 4 KiB, un fichier de 5 KiB peut demander 8 KiB d’allocation. Ce calcul ne s’applique pas systématiquement à NTFS : données résidentes, compression et autres fonctions créent des exceptions.

Changer la taille des unités d’allocation n’est pas un nettoyage courant. Cela peut nécessiter un formatage ou une migration. Ne l’entreprenez pas simplement pour faire coïncider deux nombres dans une fenêtre de propriétés.

## OneDrive peut montrer du contenu non téléchargé

Un fichier uniquement en ligne possède un nom et une taille logique sans que son contenu complet soit stocké localement. Microsoft explique les [différences de taille dans OneDrive](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match).

Vérifiez la colonne Statut. Une grande collection d’espaces réservés n’occupe pas forcément autant sur le SSD. Ouvrir ces fichiers peut les télécharger : n’ouvrez pas toute une archive uniquement pour enquêter sur sa taille.

Pour modifier la disponibilité locale sans effacer les copies cloud, consultez [Fichiers à la demande OneDrive](/articles/onedrive-files-on-demand-free-up-space/). Jugez le résultat avec l’espace libre du lecteur plutôt qu’en considérant toute la taille logique comme récupérable.

## Compression et fichiers épars

Des données compressées peuvent utiliser moins d’octets alloués que leur longueur non compressée. Les fichiers épars représentent des régions vides sans stocker physiquement chaque octet. La [documentation Microsoft sur les fichiers épars](https://learn.microsoft.com/en-us/windows/win32/fileio/sparse-files) explique cette distinction.

Les disques virtuels peuvent aussi annoncer une capacité différente de leur allocation actuelle sur l’hôte. Pour WSL ou Docker, utilisez leurs outils et [comparez les deux couches de stockage](/articles/docker-wsl-disk-space-windows/).

Ne compressez ou ne convertissez pas un disque applicatif actif uniquement pour réduire une valeur. Le logiciel peut imposer des conditions particulières ; la procédure dépend du type de fichier et de son utilisation en cours.

## Les liens physiques partagent les mêmes données

Un lien physique permet à plusieurs noms de désigner les mêmes données. Un outil additionnant les tailles logiques de chaque chemin peut donc les compter plusieurs fois. Un autre qui reconnaît l’identité commune peut afficher un total différent.

Cette distinction compte notamment pour le magasin de composants. Le [guide WinSxS](/articles/why-is-winsxs-so-big/) explique pourquoi sa taille apparente n’est pas directement récupérable. Microsoft décrit aussi les liens dans sa [présentation de NTFS](https://learn.microsoft.com/en-us/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems).

Deux noms ne représentent pas nécessairement deux copies indépendantes. Ne confondez pas un fichier système lié physiquement avec deux documents ordinaires identiques. Retirer un chemin ne garantit pas la récupération de sa taille logique affichée.

## Une analyse n’a pas toujours accès à tout

Les propriétés du lecteur incluent des usages qu’un parcours normal de dossiers ne peut pas forcément énumérer. Accès restreints, données de restauration et métadonnées expliquent certains écarts. Consultez [les points de restauration et l’espace disque](/articles/system-restore-points-disk-space/) avant d’examiner des emplacements protégés.

Windows Clean affiche gratuitement et hors connexion les fichiers accessibles, avec sunburst, treemap et liste, sans compte ni droits administrateur. Utilisez ces vues pour les données personnelles reconnaissables, tout en sachant que le stockage protégé peut manquer. Ne modifiez pas les autorisations système pour faire correspondre un graphique à l’Explorateur.

## Questions fréquentes

### Quel nombre indique ce que je peux supprimer sans risque ?

Aucun ne détermine la sécurité. Identifiez d’abord l’usage et le propriétaire du fichier. Mesurez une suppression décidée avec l’espace libre avant et après.

### Pourquoi l’allocation est-elle très faible dans OneDrive ?

Un fichier en ligne peut afficher sa taille logique alors que son contenu reste dans le cloud. Vérifiez le statut : taille visible et coût local ne sont pas équivalents.

### Pourquoi deux analyseurs donnent-ils des totaux différents ?

Ils peuvent avoir des droits différents, mesurer les octets logiques ou alloués, ou traiter les liens autrement. Comparez le périmètre et les règles de comptage avant de conclure.
