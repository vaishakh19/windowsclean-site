---
title: "Docker et WSL : libérer de l’espace sous Windows"
description: "Mesurez le stockage de Docker et WSL, examinez images et volumes, et comprenez pourquoi supprimer des fichiers Linux ne réduit pas toujours le VHDX."
date: 2026-11-23
category: Storage Tips
---

**Docker et WSL utilisent deux niveaux de stockage : les données dans Linux et le fichier de disque virtuel conservé sous Windows.** Supprimer des images ou fichiers Linux peut libérer de l’espace interne sans réduire immédiatement l’occupation de C:. Effacer le VHDX lui-même peut détruire l’environnement.

Commencez par mesurer sans rien supprimer. Déterminez si la croissance appartient à Docker, à une distribution personnelle ou à des fichiers Windows ordinaires. Si nécessaire, [recherchez les gros fichiers](/articles/find-large-files-windows/) et notez leurs chemins avant de choisir un outil.

## Identifier le propriétaire du stockage

Dans PowerShell, affichez les distributions :

```powershell
wsl --list --verbose
```

La liste indique les distributions installées et leur version WSL. WSL 2 utilise des disques virtuels ; WSL 1 a une architecture différente. Le stockage de Docker Desktop dépend aussi de son backend, de sa version et de l’historique d’installation. Ne supposez pas que `docker-desktop-data` existe partout.

Le [guide Microsoft sur l’espace WSL](https://learn.microsoft.com/en-us/windows/wsl/vhd-size) explique la capacité virtuelle et la recherche du VHDX. La [documentation Docker pour Windows](https://docs.docker.com/desktop/features/wsl/) précise son intégration. Suivez les indications correspondant à votre installation plutôt qu’un chemin repris d’un ancien forum.

## Mesurer l’utilisation de Docker

Avec Docker Desktop démarré, exécutez :

```powershell
docker system df
docker system df -v
docker container ls -a
docker image ls
docker volume ls
```

Ces commandes inspectent les ressources. La [référence de l’utilisation disque](https://docs.docker.com/reference/cli/docker/system/df/) décrit les sorties synthétiques et détaillées. Séparez images, conteneurs arrêtés, cache de compilation et volumes. Une ressource techniquement récupérable n’est pas nécessairement sans valeur.

Un conteneur arrêté peut appartenir à un projet que vous reprendrez. Un volume non rattaché peut contenir l’unique copie d’une base de développement. Identifiez le projet propriétaire et sauvegardez les données persistantes avant de supprimer quoi que ce soit.

## Préférer une suppression ciblée

Si vous reconnaissez une image obsolète ou un conteneur arrêté devenu inutile, examinez ses détails dans Docker Desktop avant de le retirer. Pour les images sans étiquette et sans référence, Docker propose :

```powershell
docker image prune
```

Cette commande supprime des données. Lisez la confirmation et annulez si son périmètre est incertain. Même si elle est plus limitée qu’une suppression de toutes les images inutilisées, sachez ce que vous pourrez reconstruire ou retélécharger.

`docker system prune` englobe également les conteneurs arrêtés, réseaux inutilisés et caches de compilation inutilisés. N’en faites pas une commande automatique de dépannage. Les options `--all` ou `--volumes` élargissent encore la suppression. Consultez le [guide de nettoyage Docker](https://docs.docker.com/engine/manage-resources/pruning/) et gardez les confirmations actives.

## Examiner votre distribution personnelle

Ouvrez la distribution concernée, puis lancez :

```bash
df -h /
du -h --max-depth=1 ~ 2>/dev/null
```

La première commande indique l’utilisation du système de fichiers. La seconde résume votre dossier personnel, pas tout Linux. Elle peut faire ressortir d’anciens résultats de compilation, jeux de données ou caches. Les éléments situés ailleurs demandent une recherche distincte.

Ne retirez que du contenu identifié, de préférence avec l’application ou le gestionnaire de paquets propriétaire. Une suppression dans le terminal Linux ne passe généralement pas par la Corbeille Windows. N’utilisez pas `wsl --unregister` comme raccourci de nettoyage : il supprime la distribution et ses données.

## Pourquoi le VHDX ne rétrécit pas forcément

Un disque virtuel à extension dynamique peut conserver son allocation sur l’hôte après suppression des fichiers internes. Sa capacité maximale, l’espace utilisé selon Linux et la taille physique sous Windows sont trois mesures distinctes. Une grande capacité virtuelle n’équivaut pas nécessairement à cette occupation sur le SSD.

Comparez l’espace libre Windows et les mesures internes après nettoyage. Si le disque hôte reste contraint, consultez les procédures actuelles de récupération ou compactage pour votre backend. Le compactage est une opération de maintenance distincte ; il ne justifie pas de supprimer ou renommer le fichier disque.

Enregistrez le travail, sauvegardez les données et arrêtez les charges concernées avant toute intervention. `wsl --shutdown` interrompt les environnements WSL en cours : ne l’utilisez pas pendant des tâches actives. Évitez aussi les commandes de compactage visant un chemin supposé.

## Limiter la croissance future

Gardez un inventaire simple des projets, volumes persistants et sorties de compilation jetables. Examinez les vieux projets avant de retirer des ressources partagées. Pour déplacer un environnement, utilisez les fonctions prises en charge d’importation, d’exportation ou les paramètres de l’application, pas un glisser-déposer du disque.

Pour les dossiers Windows classiques, consultez [le stockage AppData](/articles/appdata-folder-too-big/) et [le déplacement vers un autre lecteur](/articles/move-files-to-another-drive-windows/). Windows Clean repère les gros fichiers accessibles gratuitement et hors connexion, sans compte ni droits administrateur. Il n’analyse pas le système Linux à l’intérieur du VHDX et ne compacte pas Docker : utilisez les outils propriétaires.

## Questions fréquentes

### Puis-je supprimer ext4.vhdx ?

Pas si vous voulez conserver la distribution. Il contient son système de fichiers Linux. Identifiez son propriétaire et utilisez une procédure compatible après sauvegarde.

### Pourquoi docker system df baisse mais pas C: ?

L’utilisation interne et l’allocation sur l’hôte sont différentes. Le disque virtuel peut garder de l’espace alloué et demander une récupération adaptée au backend.

### Un volume inutilisé est-il sans risque à supprimer ?

Non. Il peut conserver les données d’un projet arrêté ou supprimé. Identifiez son contenu et sauvegardez ce qui compte avant de décider.
