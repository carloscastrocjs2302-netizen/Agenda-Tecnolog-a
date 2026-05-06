// LearnScope Service Worker v1.0
const CACHE_NAME = 'learnscope-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
];

// Instalación — cachear assets principales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS.filter(url => url.startsWith('./')));
    }).then(() => self.skipWaiting())
  );
});

// Activación — limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — Network first, cache fallback
self.addEventListener('fetch', event => {
  // No interceptar peticiones a Supabase (siempre necesitan red)
  if (event.request.url.includes('supabase.co')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cachear respuestas exitosas de assets locales
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Sin red — intentar desde caché
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback a index.html para navegación
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Sin conexión', { status: 503 });
        });
      })
  );
});
