---
title: "¿Por qué es tan grande la carpeta WinSxS y es seguro limpiarla?"
description: "WinSxS suele mostrar 6 GB o más en el Explorador de archivos. Qué contiene, por qué su tamaño engaña y la única forma segura de reducirla con DISM."
date: 2026-11-06
category: Consejos de almacenamiento
---

Si un analizador de espacio muestra `C:\Windows\WinSxS` como una de tus carpetas más grandes, no eres el único. Suele rondar los 6 GB o más, y es tentador borrarla. **No lo hagas.** Aquí tienes qué es y cómo reducirla con seguridad.

## Qué es WinSxS

WinSxS es el **almacén de componentes**. Windows guarda aquí los archivos que necesita para instalar y revertir actualizaciones, activar características opcionales y repararse a sí mismo. Borrar cosas a mano puede dañar Windows Update y la reparación del sistema.

## Por qué el tamaño engaña

La mayoría de los archivos de WinSxS son **vínculos físicos** (hard links) compartidos con las carpetas activas de `C:\Windows`. El Explorador de archivos cuenta esos archivos dos veces, por eso el tamaño mostrado es mayor que el espacio realmente usado.

Puedes ver las cifras reales desde un Símbolo del sistema o PowerShell como administrador:

```
Dism.exe /Online /Cleanup-Image /AnalyzeComponentStore
```

El informe muestra el tamaño que indica el Explorador, el **tamaño real**, cuánto se comparte con Windows, cuánto es recuperable y si se recomienda una limpieza.

## Cómo reducirla con seguridad

Si el informe recomienda una limpieza, ejecuta:

```
Dism.exe /Online /Cleanup-Image /StartComponentCleanup
```

Esto elimina versiones de componentes reemplazadas que el sistema ya no necesita. También puedes usar **Liberador de espacio en disco → Limpiar archivos del sistema → Limpieza de Windows Update**.

## Qué evitar

- Borrar archivos o carpetas dentro de `WinSxS` a mano.
- Añadir `/ResetBase` si no estás seguro. Hace imposible desinstalar las actualizaciones ya instaladas.

## En resumen

WinSxS parece más grande de lo que es, y las herramientas compatibles (DISM y el Liberador de espacio) son la única forma segura de reducirla. Considera todo lo demás de esa carpeta fuera de límites.
