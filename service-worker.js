
const CACHE_NAME = 'ai-text-enhancer-pl-v1';
const urlsToCache = [
  '/',
  'index.html',
  // Add other static assets like CSS, JS bundles, images if not CDN-hosted
  // '/manifest.json', // Manifest is usually fetched by browser directly
  // '/icon-192x192.png',
  // '/icon-512x512.png',
  // Note: Vite generates hashed assets, so dynamic caching or a build tool plugin is better for production.
  // For this example, we'll keep it simple.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' }))); // Force reload to avoid cached opaque responses from CDN
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
            if(!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic' && fetchResponse.type !== 'cors') {
              // Check for CDN resources which might be opaque
              if (fetchResponse && fetchResponse.type === 'opaque' && event.request.url.startsWith('https://cdn.tailwindcss.com')) {
                // Don't cache opaque responses directly as they have 0 status
                return fetchResponse;
              }
              return fetchResponse;
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
            console.error('Fetch failed; returning offline page instead.', err);
            // Optionally, return a fallback offline page:
            // return caches.match('/offline.html'); 
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
