---
title: "Borrar la caché de Chrome y Edge en Windows"
description: "Borra la caché de Chrome y Edge sin eliminar contraseñas ni archivos descargados. Elige las opciones correctas y comprueba el espacio recuperado."
date: 2026-11-23
category: Storage Tips
---

**Para borrar la caché de Chrome o Edge en Windows, abre el diálogo de datos de navegación y selecciona Imágenes y archivos en caché.** Deja las demás categorías sin marcar si no quieres eliminarlas. Caché, cookies, contraseñas y descargas no son lo mismo.

Esta limpieza puede recuperar almacenamiento y resolver algunos problemas de carga. No garantiza una cantidad concreta de gigabytes ni que todas las páginas funcionen más rápido. Si la unidad está llena, compara primero el navegador con otras carpetas para elegir una acción útil.

## Entiende cada casilla

| Categoría | Qué elimina | Consecuencia |
|---|---|---|
| Imágenes y archivos en caché | Copias reutilizables de contenido web | Volverán a guardarse al navegar |
| Cookies y otros datos de sitios | Sesiones y almacenamiento de páginas | Puede cerrar sesiones o quitar datos sin conexión |
| Historial de navegación | Registro de páginas visitadas | No equivale a los recursos almacenados |
| Historial de descargas | Lista de archivos descargados | No borra los archivos reales |
| Opciones de contraseñas | Credenciales, si se ofrecen | No hacen falta para limpiar la caché |

Google describe estas categorías en su [documentación de datos de navegación](https://support.google.com/chrome/answer/2392709?hl=en&co=GENIE.Platform%3DDesktop). Cada casilla representa una decisión independiente. No marques todo simplemente porque el diálogo permite hacerlo.

## Limpia la caché en Chrome

1. Abre el perfil de Chrome que quieres revisar.
2. En el menú de tres puntos, selecciona **Eliminar datos de navegación**.
3. Elige un intervalo. **Desde siempre** cubre todo lo disponible; uno más corto sirve para problemas recientes.
4. Marca **Imágenes y archivos en caché** y desmarca las categorías que quieras conservar.
5. Pulsa **Eliminar datos** y espera a que termine.

La distribución y los nombres pueden cambiar entre versiones. Si no encuentras la opción, busca datos de navegación en la configuración. La [ayuda sobre caché y cookies](https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop) describe el diálogo, pero no necesitas borrar cookies solo porque ambas aparezcan en el mismo artículo.

Guarda antes cualquier trabajo pendiente en aplicaciones web. Después abre una página conocida y comprueba que funciona. La primera carga puede tardar algo más mientras se descargan otra vez imágenes y recursos.

## Limpia la caché en Microsoft Edge

Pulsa **Ctrl + Shift + Delete** en Edge para abrir las opciones de eliminación. Microsoft incluye esta combinación en su [referencia de atajos](https://support.microsoft.com/en-us/edge/keyboard-shortcuts-in-microsoft-edge).

Selecciona el intervalo y **Imágenes y archivos en caché**. Revisa las demás casillas antes de pulsar **Borrar ahora** o el botón equivalente. También puedes acceder desde **Configuración > Privacidad, búsqueda y servicios**, donde están los controles de datos de navegación; las etiquetas dependen de la versión.

La [guía de cookies de Microsoft](https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use) explica las consecuencias adicionales de borrarlas. Si solo quieres recuperar el espacio de recursos web almacenados, conserva cookies y datos de sitios salvo que tengas un motivo concreto para quitarlos.

## Comprueba el perfil correcto

Si usas perfiles personales y de trabajo, puede haber varias carpetas de datos. Limpiar una no significa haber limpiado todas. Abre cada perfil deliberadamente y respeta las restricciones de un perfil administrado.

No borres toda la carpeta `User Data` de Chrome o Edge. Contiene mucho más que caché. Extensiones y sitios también pueden guardar datos fuera de la categoría recién eliminada; un perfil todavía grande no demuestra que la operación haya fallado.

La [guía de AppData](/articles/appdata-using-space/) ayuda a entender esas ubicaciones. Si una web guarda una biblioteca sin conexión, utiliza sus controles de almacenamiento y comprueba que podrás recuperar lo importante antes de quitar datos del sitio. No trates una aplicación web de trabajo como una simple carpeta temporal.

## Comprueba el ahorro real

En **Explorador de archivos > Este equipo**, abre las **Propiedades** de la unidad afectada. Anota el espacio libre antes y después. Cierra pestañas innecesarias durante la comparación: las descargas, las actualizaciones y otras aplicaciones pueden cambiar el resultado simultáneamente.

Windows Clean permite analizar carpetas accesibles gratuitamente y sin conexión, con vistas sunburst, treemap y lista de archivos. No exige cuenta ni permisos de administrador. Úsalo para comprobar si el navegador realmente ocupa una parte importante, no como sustituto de sus controles de limpieza por perfil.

Si el consumo principal está en Descargas, limpiar la caché no lo resolverá. [Revisa las descargas antiguas](/articles/delete-old-downloads-windows/) por separado. Para temporales administrados por Windows, consulta la [guía de limpieza de archivos temporales](/articles/delete-temporary-files-windows/).

## No hace falta vaciarla todos los días

La caché evita descargar repetidamente los mismos recursos. Vaciarla a diario puede aumentar las transferencias y ralentizar las primeras visitas sin resolver la causa de una unidad llena.

Límpiala cuando exista un problema medido de espacio o de funcionamiento. Si el espacio vuelve a bajar rápidamente, localiza qué carpeta crece. Conserva el contenido útil sin conexión y céntrate en la categoría responsable, en vez de repetir siempre el mismo borrado.

## Preguntas frecuentes

### ¿Borrar la caché elimina contraseñas?

Imágenes y archivos en caché es una categoría independiente. Revisa las selecciones y deja sin marcar las credenciales y otros datos que quieras conservar. No restablezcas todo el perfil.

### ¿Borrar el historial de descargas elimina mis archivos?

No. Quita el registro del navegador, no los archivos guardados. Examina la carpeta Descargas por separado antes de eliminar contenido.

### ¿Por qué la caché vuelve a crecer?

El navegador guarda recursos reutilizables mientras navegas. Es normal. Si el perfil crece de forma inesperada, distingue caché, extensiones, datos de sitios y descargas.
