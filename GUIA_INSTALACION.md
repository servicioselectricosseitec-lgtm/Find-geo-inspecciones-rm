# GEO Inspecciones RM — Instalar la app en el celular

La app funciona en Android, iPhone y computador. Tus planillas, ubicaciones reales y observaciones
**se guardan solo en el equipo**; nunca se suben al sitio donde publicas la app.

## 1. Publicarla (una sola vez, gratis)

### Opción A: GitHub Pages (recomendada, queda permanente)
1. Crea una cuenta en https://github.com (gratis).
2. Botón **New** (nuevo repositorio). Nombre: `geo-inspecciones-rm`. Marca **Public**. Botón **Create repository**.
3. En el repositorio: **Add file → Upload files**. Arrastra **el contenido** de la carpeta
   (index.html, sw.js, manifest.webmanifest y las carpetas icons y lib), no la carpeta completa.
   `index.html` debe quedar en la raíz. Botón **Commit changes**.
4. **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y **Save**.
5. Espera 1 a 3 minutos. La dirección de tu app será:
   `https://TU-USUARIO.github.io/geo-inspecciones-rm/`

### Opción B: Netlify Drop (la más rápida)
1. Entra a https://app.netlify.com/drop y arrastra la carpeta completa.
2. Te entrega un link https al instante. Crea una cuenta gratuita para que el sitio no se borre.

> Los nombres de los menús pueden variar levemente si GitHub o Netlify cambian su diseño.

## 2. Instalarla en el celular
- **Android (Chrome):** abre el link y toca **⬇ Instalar app** en la barra superior
  (o menú ⋮ → *Instalar aplicación*).
- **iPhone (Safari):** abre el link → botón **Compartir** → **Agregar a pantalla de inicio**.
- **Computador (Chrome o Edge):** ícono de instalación en la barra de direcciones.

La primera vez concede el permiso de **ubicación** para usar el botón *Usar mi GPS*.

## 3. Uso sin señal
- La app abre sin conexión y permite cargar planillas, revisar registros y guardar ubicaciones reales y observaciones.
- Arriba aparece **Sin conexión** en rojo y el contador **"N por enviar"** en amarillo.
- Cada registro guardado queda **pendiente de enviar**. Al volver la señal, la app avisa
  *"Conexión recuperada: tienes N registros pendientes"*. El botón **Enviar ahora** (o **📤 Enviar pendientes**
  en el paso 6) comparte un Excel solo con lo pendiente por WhatsApp, correo o Drive. Después de enviarlo,
  confirma y quedan marcados como enviados (columna ESTADO ENVÍO del Excel).
- Si guardaste un punto GPS sin escribir la dirección, la app la busca sola cuando vuelve la conexión
  y la marca como "obtenida automáticamente (validar)".
- El fondo del mapa solo se ve sin señal en las zonas que ya visitaste con conexión.
  Para navegar sin señal usa el KMZ en MAPS.ME u Organic Maps.
- La búsqueda de direcciones (geocodificación) y "Obtener dirección del punto" necesitan conexión.

## 4. Orden de ruta y avance de inspección (paso 5 de la app)
- **N° de visita:** cada punto muestra su número en el mapa y en la tabla. Al cargar el Excel se usa la
  columna de secuencia (si existe) o el orden de filas. Para cambiar un número, escríbelo en la tabla o en la
  ficha del punto: el resto se reordena solo.
- **⚡ Optimizar orden:** calcula la ruta más corta desde el primer punto, desde tu GPS o desde la base.
  Los puntos ya realizados quedan primero. Si hay filtros activos (una comuna, solo pendientes) se ordenan
  solo los puntos visibles.
- **Colores:** 🔴 pendiente · 🟢 realizado · 🟡 con duda. Los grupos de puntos (círculo oscuro con número)
  llevan el borde del color más urgente que contienen.
- **Un punto queda realizado** cuando guardas su ubicación real o tocas **✔ Marcar realizado** en su ficha.
- **Un punto queda con duda** cuando la ubicación real está a más de 150 m de la del documento, la precisión
  GPS es peor que ±30 m, la ubicación real queda fuera de la RM, la dirección se obtuvo sola desde el GPS,
  un pendiente tiene la coordenada del documento con problemas, o el inspector lo marca con duda.
  Los umbrales se ajustan en *Criterios para marcar un punto «con duda»*. **✔ Validar duda** lo deja en
  verde o rojo y guarda la fecha.
- **▶ Siguiente pendiente** abre la ficha del próximo punto; **🧭 Navegar próximos 10** abre Google Maps
  con esas paradas en orden (necesita señal).
- El Excel y el KMZ incluyen N° RUTA, ESTADO INSPECCIÓN, MOTIVO DUDA y VALIDACIÓN DUDA; en el KMZ los
  puntos van numerados y con los mismos colores.

### Excel con dashboard + macros (paso 6, botón 📊)
- Descarga un .zip con el Excel `_dashboard.xlsx` (hojas DASHBOARD, DATOS, LISTAS, INSTRUCCIONES),
  el módulo `GeoInspecciones_macros.bas` y un LEEME.
- En Excel para Windows: guardar como .xlsm → Alt+F11 → Archivo → Importar archivo (.bas) →
  Alt+F8 → **Configurar_Libro**. Crea botones, colores por estado y listas desplegables.
- Botones: aplicar/limpiar filtros, siguiente pendiente (abre Google Maps), ordenar por ruta,
  marcar realizado / con duda / pendiente, abrir en Maps, exportar PDF y actualizar.
- Sin macros (celular, Excel web) el dashboard igual calcula el avance con fórmulas.
- Todos los Excel que descarga la app traen la columna **Ubicación maps** con el link de Google Maps de cada punto.

## 5. Actualizar la app
Sube los archivos nuevos al mismo repositorio, reemplazando los anteriores. Al abrir la app
aparecerá el aviso **"Hay una nueva versión de la app"**: toca **Actualizar**.
Las ubicaciones guardadas no se pierden con la actualización.

## 6. Cuidado de los datos
- Los datos quedan en el navegador de ese equipo. Al terminar cada jornada usa
  **Descargar respaldo** o **Excel con ubicación real**.
- Si desinstalas la app o borras los datos del navegador, se pierden los registros no respaldados.
- Cada teléfono guarda sus propios datos: para juntar el trabajo de varias personas,
  exporta el Excel o el respaldo de cada una.

Licencias de librerías incluidas: ver `lib/LICENCIAS.txt`.
