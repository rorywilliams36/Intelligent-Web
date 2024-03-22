// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/images/favicon.ico',
                '/all_plants', // Cache /all_plants page
                '/login', // Cache /login page
                '/create_plant' // Cache /create_plant page
            ]);
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((cacheName) => {
                    return cacheName !== 'my-cache';
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
