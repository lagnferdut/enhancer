
const CACHE_NAME = 'ai-text-enhancer-pl-v1';
const urlsToCache = [
  '/', // Represents index.html at the root
  'index.html',
  'metadata.json', // Cache the PWA manifest
  'icon-192x192.png', // Cache PWA icon
  'icon-512x512.png', // Cache PWA icon
  // Note: Vite generates hashed assets, so dynamic caching or a build tool plugin is better for production.
  // For this example, we'll keep it simple. Other assets like index.tsx will be cached on first fetch by the fetch handler.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use { cache: 'reload' } for all initial assets to ensure fresh copies are fetched, especially during development or updates.
        const requests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
        return cache.addAll(requests);
      })
      .catch(err => {
        console.error('Failed to open cache or add urls to cache: ', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          fetchResponse => {
            // Check if we received a valid response
            if(!fetchResponse || fetchResponse.status !== 200 || (fetchResponse.type !== 'basic' && fetchResponse.type !== 'cors')) {
              // Check for CDN resources which might be opaque
              if (fetchResponse && fetchResponse.type === 'opaque' && 
                  (event.request.url.startsWith('https://cdn.tailwindcss.com') || event.request.url.startsWith('https://esm.sh'))) {
                // Don't cache opaque responses directly as they have 0 status and limited utility
                return fetchResponse;
              }
              return fetchResponse; // Return non-200s, etc., without caching
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = fetchResponse.clone();

            if (event.request.method === 'GET') { // Only cache GET requests
                caches.open(CACHE_NAME)
                .then(cache => {
                    cache.put(event.request, responseToCache);
                });
            }
            
            return fetchResponse;
          }
        ).catch(err => {
            console.error('Fetch failed for: ', event.request.url, err);
            // Optionally, return a fallback offline page if one is cached:
            // if (event.request.mode === 'navigate') { // Only for page navigations
            //   return caches.match('/offline.html'); 
            // }
            // For other assets, failing might be acceptable or need specific handling
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});