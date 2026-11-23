---
title: "Tamaño y tamaño en disco: diferencias en Windows"
description: "Entiende las diferencias entre Tamaño y Tamaño en disco en Windows, los archivos de OneDrive y los enlaces duros antes de borrar contenido."
date: 2026-11-23
category: Storage Tips
---

**Tamaño indica la longitud lógica del archivo; Tamaño en disco refleja el almacenamiento asignado según el sistema de archivos y la herramienta.** No tienen por qué coincidir. Las unidades de asignación pueden aumentar la ocupación, mientras que la compresión, los archivos dispersos y los marcadores de la nube pueden reducirla.

Hay otra comparación distinta: la suma de las carpetas visibles frente al espacio usado de toda la unidad. Los permisos, los metadatos y los datos compartidos también influyen. Una diferencia no demuestra que Windows esté averiado ni que exista una cantidad equivalente de basura eliminable.

## Compara primero la misma cosa

Pulsa con el botón derecho en un archivo local normal, abre **Propiedades** y compara ambos valores. Empieza por un archivo antes de investigar una carpeta con miles de elementos de tipos distintos.

Anota la ruta, las unidades mostradas y si pertenece a OneDrive o a una máquina virtual. Comprueba que el analizador y el Explorador examinan la misma ubicación. Tu perfil de usuario y toda la unidad C: no representan el mismo alcance.

| Lo que observas | Explicación posible | Qué revisar |
|---|---|---|
| Tamaño en disco algo mayor | Redondeo por unidades de asignación | Muchos archivos pequeños |
| Tamaño lógico mucho mayor | Nube, compresión o archivos dispersos | Estado y tipo de almacenamiento |
| Suma de carpetas demasiado alta | Datos compartidos por enlaces | Método de contabilización |
| Uso de la unidad superior a las carpetas visibles | Contenido protegido o metadatos | Permisos y almacenamiento del sistema |

La tabla sirve para diagnosticar, no para decidir qué borrar. Establece la causa antes de actuar y evita combinar cifras obtenidas en momentos diferentes mientras otras aplicaciones siguen escribiendo datos. Después puedes [buscar archivos grandes](/articles/find-large-files-windows/) para localizar candidatos que reconozcas.

## El efecto de las unidades de asignación

Los sistemas de archivos asignan espacio en unidades, también llamadas clústeres. Un archivo normal, no residente y sin comprimir puede ocupar una unidad completa aunque solo utilice parte. Con muchos archivos pequeños, la diferencia acumulada resulta visible.

Como ejemplo simplificado, una unidad de asignación de 4 KiB puede hacer que un archivo de 5 KiB necesite 8 KiB asignados. No apliques esa cuenta a todos los archivos NTFS: los datos residentes, la compresión y otras características crean excepciones.

Cambiar el tamaño de asignación no es una limpieza rutinaria. Puede implicar formatear o migrar datos. No lo hagas simplemente para que dos valores de Propiedades sean iguales; primero determina si existe un problema real de capacidad.

## OneDrive puede mostrar archivos no descargados

Un archivo solo en línea tiene nombre y tamaño lógico, aunque su contenido completo permanezca en la nube. Microsoft explica estas [diferencias de tamaño de OneDrive](https://support.microsoft.com/en-us/onedrive/onedrive-sizes-and-dates-don-t-match).

Revisa la columna Estado del Explorador. Una carpeta grande de marcadores no necesariamente consume esa misma cantidad de SSD. Abrir los archivos puede descargarlos, por lo que no conviene abrir todo un archivo histórico para medirlo.

Para cambiar su disponibilidad sin eliminar la copia en la nube, sigue la [guía de Archivos a petición](/articles/onedrive-files-on-demand-free-up-space/). Comprueba el espacio libre de la unidad en vez de suponer que todo el tamaño lógico es recuperable.

## Compresión y archivos dispersos

Los datos comprimidos pueden ocupar menos que su longitud sin comprimir. Los archivos dispersos representan regiones vacías sin almacenar físicamente todos sus bytes. La [documentación de Microsoft sobre archivos dispersos](https://learn.microsoft.com/en-us/windows/win32/fileio/sparse-files) explica este comportamiento.

Los discos virtuales pueden presentar además una capacidad virtual distinta de su ocupación actual en el equipo anfitrión. Si el archivo pertenece a WSL o Docker, utiliza sus herramientas y [compara ambos niveles de almacenamiento](/articles/docker-wsl-disk-space-windows/).

No comprimas ni conviertas un disco de aplicación en uso para reducir una cifra. El procedimiento depende del tipo de archivo y de los requisitos del programa. Un número menor no justifica poner en riesgo el entorno que contiene.

## Los enlaces duros comparten datos

Un enlace duro permite que varios nombres apunten a los mismos datos. Una herramienta que suma la longitud lógica de cada ruta puede contabilizarlos varias veces. Otra que reconoce la identidad compartida puede mostrar un total diferente.

Esto es importante al examinar el almacén de componentes. La [explicación de WinSxS](/articles/why-is-winsxs-so-big/) muestra por qué su tamaño aparente no es una cantidad directamente eliminable. Microsoft describe los enlaces en su [introducción a NTFS](https://learn.microsoft.com/en-us/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems).

Dos nombres no equivalen siempre a dos copias independientes. No confundas un enlace duro del sistema con documentos duplicados normales ni esperes recuperar todo su tamaño al borrar una ruta.

## Un análisis puede no verlo todo

Las propiedades de la unidad incluyen almacenamiento que un recorrido normal de carpetas quizá no pueda enumerar. El acceso restringido, los datos de restauración y los metadatos explican parte de las diferencias. Consulta [los puntos de restauración](/articles/system-restore-points-disk-space/) antes de investigar carpetas protegidas.

Windows Clean ofrece una vista gratuita y sin conexión de archivos accesibles, mediante sunburst, treemap y lista, sin cuenta ni permisos de administrador. Utilízala para localizar datos personales reconocibles, sabiendo que puede omitir almacenamiento protegido. No cambies permisos del sistema solo para cuadrar un gráfico.

## Preguntas frecuentes

### ¿Qué cifra indica cuánto puedo borrar con seguridad?

Ninguna determina la seguridad. Identifica la función del archivo y su propietario. Para medir una limpieza aprobada, compara el espacio libre antes y después.

### ¿Por qué Tamaño en disco es mucho menor en OneDrive?

Los archivos en línea pueden mostrar su longitud lógica sin tener el contenido descargado. Comprueba su estado; el tamaño visible no equivale necesariamente al consumo local.

### ¿Por qué dos analizadores dan resultados distintos?

Pueden tener permisos diferentes, medir bytes lógicos o asignados o tratar los enlaces de forma distinta. Compara primero el alcance y el método.
