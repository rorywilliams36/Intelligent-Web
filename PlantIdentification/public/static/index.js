
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

    // When Online
    if (navigator.onLine) {
        console.log('ONLINE');

        // First update indexddb plant store from mongoDB
        fetch('http:////localhost:3000/every_plant')
            .then(function (res) {
                return res.json();
            }).then(function (newPlants) {
            openIDB().then((db) => {
                console.log('OPEN DATABASE')
                clearPlants(db).then(() => {
                    addNewPlantsIDB(db, newPlants).then(() => {
                        console.log('Plants added')
                    });
                });
            });
        });

        fetch('http:////localhost:3000/every_comment')
            .then(function (res) {
                return res.json();
            }).then(function (newComments) {
            openIDB().then((db) => {
                console.log('OPEN DATABASE')
                clearComments(db).then(() => {
                    addNewCommentsIDB(db, newComments).then(() => {
                        console.log('Comments added')
                    });
                });
            });
        });
    }

    else {
        console.log("Offline mode")
        openIDB().then((db) => {
            getAllPlants(db).then((plants) => {
                console.log(plants)
            });
            getAllComments(db).then((comments) => {
                console.log(comments)
            });
        });
    }

}


