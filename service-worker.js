var CACHE_NAME = "football-memory-v8";

var ASSET_PATHS = [
  "./",
  "./index.html",
  "./klubi.html",
  "./klubi/",
  "./klubi/index.html",
  "./klubi-manifest.json",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-167.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./sounds/music.m4a",
  "./sounds/music.wav",
  "./sounds/applause.m4a",
  "./sounds/applause.wav",
  "./clubs/daugavpils.png",
  "./clubs/rfs.png",
  "./clubs/auda.png",
  "./clubs/grobina.png",
  "./clubs/liepaja.png",
  "./clubs/tukums.png",
  "./clubs/jelgava.png",
  "./clubs/ogre.png",
  "./clubs/riga.png",
  "./clubs/supernova.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(ASSET_PATHS);
      })
      .then(function () {
        return self.skipWaiting();
      })
      .catch(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            if (key !== CACHE_NAME) return caches.delete(key);
            return null;
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, copy);
            });
          }
          return response;
        })
        .catch(function () {
          if (event.request.url.indexOf("/klubi") !== -1) {
            return caches.match("./klubi/index.html");
          }
          return caches.match("./index.html");
        });
    })
  );
});
