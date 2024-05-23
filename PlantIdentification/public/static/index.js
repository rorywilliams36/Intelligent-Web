
window.onload= function()
{
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

    if (navigator.onLine) {
        fetch('http:////localhost:3000/all_plants')
            .then(function (res) {
                return res.json();
            }).then(function (newTodos) {
            openIDB().then((db) => {
                console.log('OPEN DATABASE')
                const transaction = db.transaction(["plants, comments"], "readwrite");
                const plantStore = transaction.objectStore("plants");
                clearStore(plantStore);
            })
        });

    } else {
        console.log("Offline mode")
        openIDB().then((db) => {
            getAllPlants(db).then((plants) => {
                getAllComments(db).then(comments)
            });
        });
    }

}


