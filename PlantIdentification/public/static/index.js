





window.onload= function() {
// Register the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('../sw.js')
            .then(registration => {
                console.log('Service worker registered:', registration);
            })
            .catch(error => {
                console.log('Service worker registration failed:', error);
            });
    }

    // Check if the browser supports the Notification API
    if ("Notification" in window) {
        // Check if the user has granted permission to receive notifications
        if (Notification.permission === "granted") {
            // Notifications are allowed, you can proceed to create notifications
            // Or do whatever you need to do with notifications
        } else if (Notification.permission !== "denied") {
            // If the user hasn't been asked yet or has previously denied permission,
            // you can request permission from the user
            Notification.requestPermission().then(function (permission) {
                // If the user grants permission, you can proceed to create notifications
                if (permission === "granted") {
                    navigator.serviceWorker.ready
                        .then(function (serviceWorkerRegistration) {
                            serviceWorkerRegistration.showNotification("Todo App",
                                {body: "Notifications are enabled!"})
                                .then(r =>
                                    console.log(r)
                                );
                        });
                }
            });
        }
    }

    if (navigator.onLine) {
        fetch('http:////localhost:3000/all_plants')
            .then(function (res) {
                return res.json();
            }).then(function (newPlants) {
            openIDB().then((db) => {
                console.log('OPEN DATABASE')
                const transaction = db.transaction(["plants, comments"], "readwrite");
                const plantStore = transaction.objectStore("plants");
                clearStore(plantStore);
            })
        });
    }

    else {
        console.log("Offline mode")
        openIDB().then((db) => {
            getAllPlants(db).then((plants) => {
                getAllComments(db).then(comments)
                console.log(plants)
            });
        });
    }

}


