const CACHE_NAME = 'visaflow-v6';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'
];

// Install — cache static assets
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(STATIC_ASSETS).catch(function(err){
        console.warn('SW pre-cache warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — network first, fallback to cache (offline support)
self.addEventListener('fetch', function(e){
  // Skip non-GET
  if(e.request.method !== 'GET') return;
  var url = new URL(e.request.url);

  // Do NOT intercept /api/ calls
  if(url.pathname.startsWith('/api/')) return;

  // Allow caching same-origin as well as CDN dependencies (jsPDF, Google Fonts, FlagCDN, GitHub raw images)
  // Cache only same-origin static assets and key CDN libraries to prevent WebView memory overflow
  const isStaticAsset = url.origin === self.location.origin ||
    url.origin.includes('cdnjs.cloudflare.com') ||
    url.origin.includes('fonts.googleapis.com') ||
    url.origin.includes('fonts.gstatic.com');

  if(!isStaticAsset) return;

  e.respondWith(
    caches.match(e.request).then(function(cachedResponse) {
      if (cachedResponse) {
        // Return cached, update in background if online
        fetch(e.request).then(function(networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(e.request, networkResponse);
            });
          }
        }).catch(function(){});
        return cachedResponse;
      }

      return fetch(e.request).then(function(response) {
        if (response && response.status === 200 && response.type === 'basic') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      }).catch(function() {
        const accept = e.request.headers.get('accept');
        if (accept && accept.includes('text/html')) {
          return caches.match('./index.html') || caches.match('./');
        }
        return new Response('Offline resource not available', { status: 503 });
      });
    })
  );
});
