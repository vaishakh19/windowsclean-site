---
title: "Windows Installer ocupa mucho: qué hacer sin riesgo"
description: "Descubre por qué crece C:\Windows\Installer, qué riesgos tiene borrar archivos MSI o MSP y cómo recuperar espacio con métodos compatibles."
date: 2026-11-23
category: Windows Storage
---

**Si la carpeta Windows Installer ocupa demasiado, no borres manualmente sus archivos MSI o MSP.** `C:\Windows\Installer` guarda material de instalación que los programas pueden necesitar más adelante. Un archivo antiguo o con un nombre extraño no es necesariamente prescindible.

Lo útil es averiguar qué aplicación utiliza ese espacio y qué operación compatible permite reducirlo. Confirma la ruta y revisa el software instalado. Este artículo trata de la caché del instalador; [limpiar Windows Update](/articles/clean-windows-update-files/) y [reducir WinSxS](/articles/why-is-winsxs-so-big/) son tareas distintas.

## Qué guarda la carpeta Installer

Las aplicaciones instaladas mediante Windows Installer pueden conservar paquetes y parches necesarios para su mantenimiento. Esta caché no equivale al instalador descargado en Descargas. Borrar una descarga que ya no necesitas y borrar archivos internos de mantenimiento tienen consecuencias diferentes.

Microsoft advierte en su [documentación sobre la caché perdida](https://learn.microsoft.com/en-us/troubleshoot/windows-client/application-management/missing-windows-installer-cache) de que el daño puede aparecer al reparar, actualizar o desinstalar una aplicación. Que el programa abra hoy no demuestra que esos paquetes no hagan falta.

La carpeta puede acumular datos de varios productos y actualizaciones. No existe un tamaño normal universal ni una antigüedad que garantice que un archivo se puede borrar. Una aplicación vieja que todavía utilizas puede seguir necesitando su material de instalación.

## Identifica la ubicación exacta

Varias carpetas parecen similares, pero cumplen funciones diferentes:

| Ubicación | Función habitual | Por dónde empezar |
|---|---|---|
| `C:\Windows\Installer` | Caché de instalación de aplicaciones | Mantenimiento del programa |
| `C:\Windows\WinSxS` | Almacén de componentes de Windows | Limpieza compatible con Windows |
| Descargas | Archivos descargados por ti | Revisión individual |
| Caché propia de una aplicación | Datos de trabajo del programa | Sus ajustes o documentación |

Anota la ruta y el tamaño aproximado. Si Windows deniega el acceso, no cambies permisos o propietario solo para que una herramienta de limpieza entre. Un análisis sin permisos de administrador puede omitir contenido protegido y no representa necesariamente todo el almacenamiento del sistema.

## Revisa las aplicaciones instaladas

En Windows 11 abre **Inicio > Configuración > Aplicaciones > Aplicaciones instaladas**. En Windows 10 utiliza **Configuración > Aplicaciones > Aplicaciones y características**. Busca programas conocidos que ya no necesites y versiones antiguas que convivan con otras nuevas.

Antes de desinstalar, guarda los proyectos, los datos de licencia y los medios de instalación necesarios. Cierra el programa, abre su menú y selecciona **Desinstalar**. Algunas aplicaciones de escritorio utilizan **Panel de control > Programas > Programas y características**.

Son las [vías de desinstalación admitidas por Microsoft](https://support.microsoft.com/en-us/windows/apps/uninstall-or-remove-apps-and-programs-in-windows). Permiten que el instalador gestione sus recursos y registros. No garantizan que Installer se reduzca exactamente lo que indicaba el tamaño de la aplicación: pueden existir componentes compartidos y diferencias entre productos.

## Qué hacer con $PatchCache$

Algunas recomendaciones sugieren borrar `C:\Windows\Installer\$PatchCache$` o modificar una política del registro. Se trata de comportamiento de mantenimiento del instalador, no de una limpieza ordinaria de temporales.

Microsoft documenta la política [MaxPatchCacheSize](https://learn.microsoft.com/en-us/windows/win32/msi/maxpatchcachesize), relacionada con conservar versiones anteriores de archivos al aplicar parches. Que exista esa política no significa que sea recomendable borrar las carpetas ya existentes. La disponibilidad de los originales y las necesidades del producto siguen importando.

En un equipo administrado, pide al responsable o al proveedor de la aplicación un procedimiento compatible. Evita scripts genéricos para eliminar MSI supuestamente huérfanos si nadie ha confirmado que esos archivos concretos son prescindibles. Aquí no se propone ningún comando de borrado masivo.

## Recupera espacio en otras categorías

Si necesitas espacio urgente, deja Installer intacto y trabaja con contenido que puedas identificar. Abre **Configuración > Sistema > Almacenamiento > Archivos temporales**, revisa cada categoría y selecciona solo lo que comprendas. Descargas puede contener documentos personales: no la marques automáticamente.

Después, [localiza archivos personales grandes](/articles/find-large-files-windows/), como vídeos, archivos comprimidos o exportaciones antiguas. Mueve a otra unidad lo que quieras conservar. La [guía de archivos temporales](/articles/delete-temporary-files-windows/) distingue la limpieza admitida de borrar carpetas al azar.

Windows Clean ofrece análisis gratuito y sin conexión mediante sunburst, treemap y lista de archivos, sin cuenta ni permisos de administrador. Úsalo para investigar contenido accesible. Un bloque grande no demuestra que un archivo del sistema se pueda eliminar, ni sustituye al instalador de la aplicación.

## Si ya has borrado archivos de la caché

Detén las eliminaciones. Anota el producto afectado, el mensaje de error y lo que se borró. Consulta al proveedor sobre una reparación compatible. No copies archivos con nombres parecidos desde otro PC suponiendo que pertenecen a tu instalación.

Microsoft ofrece [ayuda para problemas de instalación y eliminación](https://support.microsoft.com/en-us/windows/deployment/install-upgrade/fix-problems-that-block-programs-from-being-installed-or-removed). La recuperación depende del programa y de lo que falte; no siempre basta con volver a abrirlo.

## Preguntas frecuentes

### ¿Puedo borrar MSI y MSP antiguos?

La edad o el nombre no bastan para decidirlo. Pueden seguir siendo necesarios para actualizar, reparar o quitar una aplicación. Utiliza su mantenimiento oficial.

### ¿El Liberador de espacio elimina toda la caché?

No debes esperarlo. Usa las categorías que Windows ofrece expresamente y deja que cada instalador gestione sus propios archivos de mantenimiento.

### ¿Una carpeta Installer grande significa que hay malware?

El tamaño por sí solo no permite diagnosticar malware. Identifica los productos y utiliza tus herramientas de seguridad para investigar una sospecha independiente.
