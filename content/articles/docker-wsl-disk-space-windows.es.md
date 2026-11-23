---
title: "Docker y WSL en Windows: recuperar espacio con cuidado"
description: "Analiza el espacio de Docker y WSL en Windows, revisa imágenes y volúmenes y entiende por qué borrar archivos Linux no siempre reduce el VHDX."
date: 2026-11-23
category: Storage Tips
---

**El espacio de Docker y WSL tiene dos niveles: los datos dentro de Linux y el archivo de disco virtual guardado en Windows.** Borrar imágenes o archivos Linux puede liberar espacio interno sin reducir inmediatamente lo ocupado en C:. Eliminar el propio VHDX puede destruir el entorno.

Empieza midiendo, sin borrar. Averigua si el crecimiento pertenece a Docker, a tu distribución WSL o a archivos normales de Windows. Si desconoces la ubicación, [busca archivos grandes](/articles/find-large-files-windows/) y anota sus rutas antes de elegir una herramienta.

## Identifica al propietario del almacenamiento

En PowerShell, muestra las distribuciones:

```powershell
wsl --list --verbose
```

La lista indica qué distribuciones tienes y su versión de WSL. WSL 2 utiliza discos virtuales; WSL 1 emplea otra arquitectura. La organización de Docker Desktop depende de su versión, del backend y del historial de instalación. No supongas que siempre existe una distribución llamada `docker-desktop-data`.

La [guía de espacio de WSL](https://learn.microsoft.com/en-us/windows/wsl/vhd-size) explica la capacidad virtual y cómo localizar el VHDX. La [documentación de Docker para Windows](https://docs.docker.com/desktop/features/wsl/) describe su relación con WSL. Usa la información correspondiente a tu instalación, no una ruta tomada de un foro antiguo.

## Mide Docker antes de limpiar

Con Docker Desktop en ejecución:

```powershell
docker system df
docker system df -v
docker container ls -a
docker image ls
docker volume ls
```

Estos comandos sirven para inspeccionar. La [referencia de uso de disco](https://docs.docker.com/reference/cli/docker/system/df/) explica la salida resumida y detallada. Separa imágenes, contenedores detenidos, caché de compilación y volúmenes. Que algo sea recuperable técnicamente no significa que carezca de valor para ti.

Un contenedor detenido puede pertenecer a un proyecto pendiente. Un volumen sin contenedor asociado puede guardar la única copia de una base de datos. Identifica el proyecto propietario y respalda los datos persistentes antes de eliminar recursos.

## Prefiere una limpieza limitada

Si reconoces una imagen obsoleta o un contenedor detenido que ya no necesitas, revisa sus detalles y elimínalo desde Docker Desktop. Para imágenes sin etiqueta y sin referencias, Docker ofrece:

```powershell
docker image prune
```

Este comando sí borra datos. Lee la confirmación y cancela si no entiendes el alcance. Aunque sea más limitado que eliminar todas las imágenes no utilizadas, debes saber qué puedes reconstruir o descargar de nuevo.

`docker system prune` abarca también contenedores detenidos, redes no utilizadas y caché de compilación. No lo ejecutes como una solución genérica sin explicación. Opciones como `--all` y `--volumes` amplían las eliminaciones. Consulta la [guía de limpieza de Docker](https://docs.docker.com/engine/manage-resources/pruning/) y conserva las confirmaciones.

## Examina tu distribución Linux por separado

Abre la distribución que utilizas y ejecuta:

```bash
df -h /
du -h --max-depth=1 ~ 2>/dev/null
```

El primer comando muestra el uso del sistema de archivos. El segundo resume tu directorio personal, no todo Linux. Puede señalar compilaciones antiguas, conjuntos de datos y cachés. Los archivos grandes fuera de ese directorio necesitan otra investigación.

Borra únicamente material reconocido, preferiblemente mediante la aplicación o el gestor de paquetes correspondiente. Una eliminación desde la consola Linux normalmente no pasa por la Papelera de Windows. No utilices `wsl --unregister` como atajo: elimina la distribución y sus datos.

## Por qué el VHDX sigue siendo grande

Un disco virtual que crece dinámicamente puede conservar asignación en el equipo anfitrión después de borrar contenido interno. Su capacidad máxima, el uso indicado por Linux y el tamaño del archivo en Windows responden a preguntas distintas. Una capacidad virtual grande no implica necesariamente ese mismo consumo físico del SSD.

Compara el espacio libre de Windows con las mediciones internas después de limpiar. Si sigue faltando espacio físico, consulta el procedimiento actual de recuperación o compactación para tu backend. Compactar es otra tarea de mantenimiento, no una razón para borrar o renombrar el disco.

Guarda el trabajo, respalda los datos y detén las cargas correspondientes antes de cualquier mantenimiento. `wsl --shutdown` detiene los entornos WSL en ejecución; no lo uses con tareas activas. Tampoco copies instrucciones de compactación que apunten a una ruta supuesta.

## Evita que el problema se repita

Mantén un inventario sencillo de proyectos, volúmenes persistentes y resultados de compilación desechables. Revisa los proyectos antiguos antes de quitar recursos compartidos. Para trasladar un entorno, utiliza importación, exportación o ajustes compatibles en lugar de arrastrar su disco en el Explorador.

Para carpetas normales, consulta [el espacio de AppData](/articles/appdata-folder-too-big/) y [cómo mover archivos a otra unidad](/articles/move-files-to-another-drive-windows/). Windows Clean localiza archivos accesibles mediante un análisis gratuito, sin conexión, sin cuenta y sin permisos de administrador. No examina Linux dentro del VHDX ni compacta Docker: esas tareas corresponden a sus propias herramientas.

## Preguntas frecuentes

### ¿Puedo borrar ext4.vhdx?

No si quieres conservar la distribución. Contiene su sistema de archivos. Identifica al propietario y utiliza un procedimiento compatible después de respaldar los datos.

### ¿Por qué mejora docker system df pero no C:?

El uso interno y la asignación física son mediciones diferentes. El disco virtual puede conservar espacio asignado y necesitar recuperación específica del backend.

### ¿Es seguro borrar un volumen sin uso?

No automáticamente. Puede contener datos persistentes de un proyecto detenido o eliminado. Identifica su contenido y respáldalo antes de decidir.
