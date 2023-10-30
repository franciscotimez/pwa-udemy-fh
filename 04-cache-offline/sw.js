// Service Worker
const CACHE_NAME = "cache-1";

self.addEventListener("install", (event) => {
  const cachePromise = caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
      "/js/app.js",
    ]);
  });

  event.waitUntil(cachePromise);
});

self.addEventListener("fetch", (event) => {
  // // 1 - Cache Only
  // event.respondWith(caches.match(event.request));

  // 2 - Cache with Network Fallback
  const response = caches.match(event.request).then((res) => {
    if (res) return res;

    // No existe -> Network Fallback
    return fetch(event.request).then((newRes) => {
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, newRes);
      });
      return newRes.clone();
    });
  });

  event.respondWith(response);
});
