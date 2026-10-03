/* GEO Inspecciones RM — service worker. Versión: 79fcf732b3 */
const VERSION = "79fcf732b3";
const NUCLEO = "geoRM-nucleo-" + VERSION;
const MAPAS = "geoRM-mapas";          // teselas OSM ya visitadas (se conservan entre versiones)
const FUENTES = "geoRM-fuentes";
const MAX_TESELAS = 2500;
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./lib/MarkerCluster.Default.css",
  "./lib/MarkerCluster.css",
  "./lib/jszip.min.js",
  "./lib/leaflet.css",
  "./lib/leaflet.js",
  "./lib/leaflet.markercluster.js",
  "./lib/xlsx.full.min.js",
  "./lib/images/layers-2x.png",
  "./lib/images/layers.png",
  "./lib/images/marker-icon-2x.png",
  "./lib/images/marker-icon.png",
  "./lib/images/marker-shadow.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(NUCLEO).then(c => c.addAll(ARCHIVOS)));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys())
      if (k.startsWith("geoRM-nucleo-") && k !== NUCLEO) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("message", e => { if (e.data === "actualizar") self.skipWaiting(); });

async function recortar(nombre, max) {
  const c = await caches.open(nombre), k = await c.keys();
  for (let i = 0; i < k.length - max; i++) await c.delete(k[i]);
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Geocodificación: siempre en línea (la app tiene su propia caché de direcciones)
  if (url.hostname.endsWith("nominatim.openstreetmap.org")) return;

  // Navegación: red primero, respaldo sin conexión
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => {
      const copia = r.clone(); caches.open(NUCLEO).then(c => c.put("./index.html", copia)); return r;
    }).catch(() => caches.match("./index.html", { ignoreSearch: true })));
    return;
  }

  // Fondo del mapa: caché primero; guarda lo que se ve (no descarga zonas por adelantado)
  if (url.hostname.endsWith("tile.openstreetmap.org")) {
    e.respondWith(caches.open(MAPAS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const r = await fetch(req);
        if (r.ok || r.type === "opaque") { c.put(req, r.clone()); recortar(MAPAS, MAX_TESELAS); }
        return r;
      } catch (err) { return new Response("", { status: 504 }); }
    }));
    return;
  }

  // Tipografías: se reutiliza la copia guardada y se refresca en segundo plano
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.open(FUENTES).then(async c => {
      const hit = await c.match(req);
      const red = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || red;
    }));
    return;
  }

  // Archivos propios de la app: caché primero
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
  }
});
