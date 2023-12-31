// Service Worker
// const CACHE_NAME = "cache-1";
const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_DYNAMIC_LIMIT = 5;
const CACHE_INMUTABLE_NAME = "inmutable-v1";

const limpiarCache = (cacheName, numberOfItems) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > numberOfItems) {
        cache.delete(keys[0]).then(limpiarCache(cacheName, numberOfItems));
      }
    });
  });
};

self.addEventListener("install", (event) => {
  const cachePromise = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "/img/no-img.jpg",
      "/js/app.js",
    ]);
  });

  const cacheInmutablePromise = caches
    .open(CACHE_INMUTABLE_NAME)
    .then((cache) => {
      return cache.addAll([
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
      ]);
    });

  event.waitUntil(Promise.all([cachePromise, cacheInmutablePromise]));
});

self.addEventListener("fetch", (event) => {
  // // 1 - Cache Only
  // event.respondWith(caches.match(event.request));

  // // 2 - Cache with Network Fallback
  // const response = caches.match(event.request).then((res) => {
  //   if (res) return res;

  //   // No existe -> Network Fallback
  //   return fetch(event.request).then((newRes) => {
  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(event.request, newRes);
  //       limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
  //     });
  //     return newRes.clone();
  //   });
  // });

  // event.respondWith(response);

  // // 3 - Network first with cache fallback
  // const response = fetch(event.request)
  //   .then((newRes) => {
  //     if (!newRes) return caches.match(event.request);

  //     caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
  //       cache.put(event.request, newRes);
  //       limpiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
  //     });
  //     return newRes.clone();
  //   })
  //   .catch((err) => {
  //     return caches.match(event.request);
  //   });

  // event.respondWith(response);

  // // 4 - Cache with network update
  // // Rendimiento critico
  // // Actualizacion siempre un paso atras
  // const response = caches.open(CACHE_STATIC_NAME).then((cache) => {
  //   fetch(event.request).then((newRes) => cache.put(event.request, newRes) )
  //   return caches.match(event.request);
  // });
  // event.respondWith(response);

  // 5 - Cache & network Race
  const response = new Promise((resolve, reject) => {
    let rejected = false;

    const failOnce = () => {
      if (rejected) {
        if (/\.(png|jpg)$/i.test(event.request.url)) {
          resolve(caches.match("/img/no-img.jpg"));
        } else reject("Not Found");
      } else rejected = true;
    };

    fetch(event.request)
      .then((res) => {
        res.ok ? resolve(res) : failOnce();
      })
      .catch(failOnce);

    caches
      .match(event.request)
      .then((res) => {
        res ? resolve(res) : failOnce();
      })
      .catch(failOnce);
  });
  event.respondWith(response);
});
