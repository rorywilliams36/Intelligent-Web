importScripts('/static/idb_util.js');

// Install event
self.addEventListener('install', event => {
    console.log('Service Worker: Installing....');
    event.waitUntil((async () => {

        console.log('Service Worker: Caching App Shell at the moment......');
        try {
            const cache = await caches.open("static");
            cache.addAll([
                '/',
                '/images/favicon.ico',
                '/all_plants', // Cache /all_plants page
                '/login', // Cache /login page
                '/create_plant', // Cache /create_plant page
                '/submit-plant',
                '/static/index.js',
                '/static/idb_util.js',
                '/views/index.ejs',
                '/views/plant.ejs'
            ]);
            console.log('Service Worker: App Shell Cached');
        }
        catch{
            console.log("error occured while caching...")
        }

    })());
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith((async () => {
        const cache = await caches.open("my-cache");
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            console.log('Service Worker: Fetching from Cache: ', event.request.url);
            return cachedResponse;
        }
        console.log('Service Worker: Fetching from URL: ', event.request.url);
        return fetch(event.request);
    })());
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

//Sync event to sync the todos
self.addEventListener('sync', event => {
    if (event.tag === 'sync-plant') {
        console.log('Service Worker: Syncing new Plants');
        openSyncIDB().then((syncDataDB) => {
            getAllSyncPlants(syncDataDB).then((syncPlants) => {
                for (const syncPlant of syncPlants) {
                    console.log('Service Worker: Syncing new Plant: ', syncPlant);
                    // Create a FormData object
                    const formData = new URLSearchParams();

                    // Iterate over the properties of the JSON object and append them to FormData
                    formData.append("data", syncPlant);

                    // Fetch with FormData instead of JSON
                    fetch('http://localhost:3000/submit-plant', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(() => {
                        console.log('Service Worker: Syncing new Plant: ', syncPlant, ' done');
                        deleteSyncPlantFromIDB(syncDataDB,syncPlant.id);
                        // Send a notification
                        self.registration.showNotification('Plant Synced', {
                            body: 'Plant synced successfully!',
                        });
                    }).catch((err) => {
                        console.error('Service Worker: Syncing new Plant: ', syncPlant, ' failed');
                    });
                }
            });
        });
    }
    if (event.tag === 'sync-comments') {
        console.log('Service Worker: Syncing new Comments');
        openSyncIDB().then((syncDataDB) => {
            getAllSyncComments(syncDataDB).then((syncComments) => {
                for (const syncComment of syncComments) {
                    console.log('Service Worker: Syncing new Comment: ', syncComment);
                    // Create a FormData object
                    const formData = new URLSearchParams();

                    // Iterate over the properties of the JSON object and append them to FormData
                    formData.append("data", syncComment);

                    // Fetch with FormData instead of JSON
                    fetch('http://localhost:3000/add_comment', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }).then(() => {
                        console.log('Service Worker: Syncing new Todo: ', syncComment, ' done');
                        deleteSyncCommentFromIDB(syncDataDB,syncComment.id);
                        // Send a notification
                        self.registration.showNotification('Comment Synced', {
                            body: 'Comment synced successfully!',
                        });
                    }).catch((err) => {
                        console.error('Service Worker: Syncing new Todo: ', syncComment, ' failed');
                    });
                }
            });
        });
    }
});
