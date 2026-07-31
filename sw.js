const CACHE_NAME = 'visaflow-v4';
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
  const isAllowedOrigin = url.origin === self.location.origin ||
    url.origin.includes('cdnjs.cloudflare.com') ||
    url.origin.includes('fonts.googleapis.com') ||
    url.origin.includes('fonts.gstatic.com') ||
    url.origin.includes('flagcdn.com') ||
    url.origin.includes('githubusercontent.com');

  if(!isAllowedOrigin) return;

  e.respondWith(
    fetch(e.request)
      .then(function(response){
        // Cache fresh successful responses
        if (response.status === 200 || response.type === 'opaque') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){
            cache.put(e.request, clone);
          });
        }
        return response;
      })
      .catch(function(){
        // Offline fallback
        return caches.match(e.request).then(function(cached){
          if (cached) return cached;
          // Fallback to index.html for HTML navigation requests
          const accept = e.request.headers.get('accept');
          if (accept && accept.includes('text/html')) {
            return caches.match('./index.html') || caches.match('./');
          }
          return new Response('Offline resource not available', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});
