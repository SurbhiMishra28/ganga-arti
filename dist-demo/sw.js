const CACHE_PREFIX = 'ganga-arti-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-v3`;
const ASSET_CACHE = `${CACHE_PREFIX}assets-v3`;
const SHELL_ASSETS = [
  '/',
  '/favicon.png',
  '/manifest.json',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png',
];
const MAX_CACHED_ASSETS = 80;

const isCacheableAsset = (url) =>
  url.pathname.startsWith('/assets/') &&
  !/\.(?:mp4|m4v|mov|webm|mp3|wav|ogg)$/i.test(url.pathname);

async function cacheAsset(request, response) {
  if (!response.ok || response.type !== 'basic') return response;

  const cache = await caches.open(ASSET_CACHE);
  await cache.put(request, response.clone());
  const keys = await cache.keys();
  if (keys.length > MAX_CACHED_ASSETS) {
    await cache.delete(keys[0]);
  }
  return response;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && ![SHELL_CACHE, ASSET_CACHE].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.put('/', responseClone)));
          }
          return response;
        })
        .catch(async () =>
          (await caches.match(event.request, { cacheName: SHELL_CACHE })) ||
          (await caches.match('/', { cacheName: SHELL_CACHE }))
        )
    );
    return;
  }

  if (isCacheableAsset(requestUrl)) {
    event.respondWith((async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;

      const response = await fetch(event.request);
      return cacheAsset(event.request, response);
    })());
  }
});