function openIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("data", 1);

        request.onerror = function (event) {
            reject(new Error(`Database error: ${event.target}`));
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            handleUpgrade(db)
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            resolve(db);
        };
    });
}


// Initalise IndexDB
const handleUpgrade = (ev) => {
    const db = ev.target.result
    // Create object store for plants
    const plants = db.createObjectStore("plants", { keyPath: "id", autoIncrement: true })

    // Init plants schema for Indexdb
    plants.createIndex("Plant_Name", "Plant_Name", { unique: false });
    plants.createIndex("Username", "Username", { unique: false });
    plants.createIndex("Date_Seen", "Date_Seen", { unique: false });
    plants.createIndex("Location", "Location", { unique: false });
    plants.createIndex("Location_Name", "Location_Name", { unique: false });
    plants.createIndex("Description", "Description", { unique: false });
    plants.createIndex("Height", "Height", { unique: false });
    plants.createIndex("Spread", "Spread", { unique: false });
    plants.createIndex("Flowers", "Flowers", { unique: false });
    plants.createIndex("Flower_Colour", "Flower_Colour", { unique: false });
    plants.createIndex("Leaves", "Leaves", { unique: false });
    plants.createIndex("Sun_Exposure", "Sun_Exposure", { unique: false });
    plants.createIndex("Img", "Img", { unique: false });

    // Create IndexDB table for comments
    const comments = db.createObjectStore("comments", { keyPath: "id", autoIncrement: true })

    // Init schema for comments
    comments.createIndex("Username", "Username", {unique: false});
    comments.createIndex("Plant", "Plant", {unique: false});
    comments.createIndex("Date", "Date", {unique: false});
    comments.createIndex("Comment", "Comment", {unique: false});
}


const addNewPlantsIDB = (dataIDB, plants) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(["plants"], "readwrite");
        const plantStore = transaction.objectStore("plants");

        const addPromises = plants.map(plant => {
            return new Promise((resolveAdd, rejectAdd) => {
                const addRequest = plantStore.add(plant);
                addRequest.addEventListener("success", () => {
                    const getRequest = plantStore.get(addRequest.result);
                    getRequest.addEventListener("success", () => {
                        console.log("Found " + JSON.stringify(getRequest.result));
                        // Assume insertTodoInList is defined elsewhere
                        resolveAdd(); // Resolve the add promise
                    });
                    getRequest.addEventListener("error", (event) => {
                        rejectAdd(event.target.error); // Reject the add promise if there's an error
                    });
                });
                addRequest.addEventListener("error", (event) => {
                    rejectAdd(event.target.error); // Reject the add promise if there's an error
                });
            });
        });

        // Resolve the main promise when all add operations are completed
        Promise.all(addPromises).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

const clearPlants = (dataIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(['plants'], "readwrite");
        const plantStore = transaction.objectStore("plants");
        const result = plantStore.clear();
        result.addEventListener("success", () => {
            console.log("Plant indexddb cleared");
            resolve()
        })
        result.addEventListener("error", (event) => {
            console.log('Error occured clearing Plants indexddb');
            reject(event.target.error);
        })
    })
}

// Adds comments to indexDB
const addNewCommentsIDB = (dataIDB, comments) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(["comments"], "readwrite");
        const commentStore = transaction.objectStore("comments");

        const addPromises = comments.map(comment => {
            return new Promise((resolveAdd, rejectAdd) => {
                const addRequest = commentStore.add(comment);
                addRequest.addEventListener("success", () => {
                    const getRequest = commentStore.get(addRequest.result);
                    getRequest.addEventListener("success", () => {
                        console.log("Found " + JSON.stringify(getRequest.result));
                        // Assume insertTodoInList is defined elsewhere
                        resolveAdd(); // Resolve the add promise
                    });
                    getRequest.addEventListener("error", (event) => {
                        rejectAdd(event.target.error); // Reject the add promise if there's an error
                    });
                });
                addRequest.addEventListener("error", (event) => {
                    rejectAdd(event.target.error); // Reject the add promise if there's an error
                });
            });
        });

        // Resolve the main promise when all add operations are completed
        Promise.all(addPromises).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

// Clears the Comment Store
const clearComments = (dataIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(["comments"], "readwrite");
        const commentStore = transaction.objectStore("comments");
        const result = commentStore.clear();
        result.addEventListener("success", () => {
            console.log("Comment indexddb cleared");
            resolve()
        })
        result.addEventListener("error", (event) => {
            console.log('Error occured clearing Comments indexddb');
            reject(event.target.error);
        })
    })
}

// Gets all plants from indexDB
const getAllPlants = (dataIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(["plants", "comments"], "readonly");
        const plantStore = transaction.objectStore("plants");
        const getAllRequest = plantStore.getAll();

        // Handle success event
        getAllRequest.addEventListener("success", (event) => {
            resolve(event.target.result); // Use event.target.result to get the result
        });

        // Handle error event
        getAllRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
}

const getAllComments = (dataIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(["plants", "comments"], "readonly");
        const commentStore = transaction.objectStore("comments");
        const getAllRequest = commentStore.getAll();

        // Handle success event
        getAllRequest.addEventListener("success", (event) => {
            resolve(event.target.result); // Use event.target.result to get the result
        });

        // Handle error event
        getAllRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
}

    // --------------------SYNCING----------------------


function openSyncIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("sync-data");

        request.onerror = function (event) {
            reject(new Error(`Database error: ${event.target}`));
        };

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            handleSyncUpgrade(db)
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            resolve(db);
        };
    });
}

// Initalise IndexDB
const handleSyncUpgrade = (ev) => {
    const db = ev
    // Create object store for plants
    const plants = db.createObjectStore("sync-plants", { keyPath: "id", autoIncrement: true })

    // Init plants schema for Indexdb
    plants.createIndex("Plant_Name", "Plant_Name", { unique: false });
    plants.createIndex("Username", "Username", { unique: false });
    plants.createIndex("Date_Seen", "Date_Seen", { unique: false });
    plants.createIndex("Location", "Location", { unique: false });
    plants.createIndex("Location_Name", "Location_Name", { unique: false });
    plants.createIndex("Description", "Description", { unique: false });
    plants.createIndex("Height", "Height", { unique: false });
    plants.createIndex("Spread", "Spread", { unique: false });
    plants.createIndex("Flowers", "Flowers", { unique: false });
    plants.createIndex("Flower_Colour", "Flower_Colour", { unique: false });
    plants.createIndex("Leaves", "Leaves", { unique: false });
    plants.createIndex("Sun_Exposure", "Sun_Exposure", { unique: false });
    plants.createIndex("Img", "Img", { unique: false });

    // Create IndexDB table for comments
    const comments = db.createObjectStore("sync-comments", { keyPath: "id", autoIncrement: true })

    // Init schema for comments
    comments.createIndex("Username", "Username", {unique: false});
    comments.createIndex("Plant", "Plant", {unique: false});
    comments.createIndex("Date", "Date", {unique: false});
    comments.createIndex("Comment", "Comment", {unique: false});
}


const addSyncPlants = (syncDataIDB, plant) => {
    console.log('PLANT', plant)
    const transaction = syncDataIDB.transaction(["sync-plants"], "readwrite");
    const plantStore = transaction.objectStore("sync-plants");
    const addResult = plantStore.add(plant);
    addResult.addEventListener("success", () => {
        console.log("Found " + JSON.stringify(addResult.result))
        const getRequest = plantStore.get(addResult.result)
        getRequest.addEventListener("success", () => {
            // Send a sync message to the service worker
            navigator.serviceWorker.ready.then((sw) => {
                sw.sync.register("sync-plant")
            }).then(() => {
                console.log("Sync registered");
            }).catch((err) => {
                console.log("Sync registration failed: " + JSON.stringify(err))
            })
        })
    })
}

// Trigger sync event to be added to indexddb
const addSyncComments = (syncDataIDB, comment) => {
    const transaction = syncDataIDB.transaction(["sync-comments"], "readwrite");
    const commentStore = transaction.objectStore("sync-comments");
    const addResult = commentStore.add(comment);

    addResult.addEventListener("success", () => {
        console.log("Found " + JSON.stringify(addResult.result))
        const getRequest = commentStore.get(addResult.result)
        getRequest.addEventListener("success", () => {
            // Send a sync message to the service worker
            navigator.serviceWorker.ready.then((sw) => {
                sw.sync.register("sync-comments")
            }).then(() => {
                console.log("Sync registered");
            }).catch((err) => {
                console.log("Sync registration failed: " + JSON.stringify(err))
        })
        })
    })
}


// Gets all plants from indexDB
const getAllSyncPlants = (syncDataIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = syncDataIDB.transaction(["sync-plants", "sync-comments"], "readonly");
        const plantStore = transaction.objectStore("sync-plants");
        const getAllRequest = plantStore.getAll();

        // Handle success event
        getAllRequest.addEventListener("success", (event) => {
            resolve(event.target.result); // Use event.target.result to get the result
        });

        // Handle error event
        getAllRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
}

const getAllSyncComments = (dataIDB) => {
    return new Promise((resolve, reject) => {
        const transaction = dataIDB.transaction(["sync-plants", "sync-comments"], "readonly");
        const commentStore = transaction.objectStore("sync-comments");
        const getAllRequest = commentStore.getAll();

        // Handle success event
        getAllRequest.addEventListener("success", (event) => {
            resolve(event.target.result); // Use event.target.result to get the result
        });

        // Handle error event
        getAllRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
}
const clearSyncStore = (store, syncDataIDB) => {
    const transaction = syncDataIDB.transaction(["sync-plants", "sync-comments"], "readwrite");
    const storeIDB = transaction.objectStore(store);
    const clearRequest = storeIDB.clear();

    return new Promise((resolve, reject) => {
        clearRequest.addEventListener("success", () => {
            resolve();
        });

        clearRequest.addEventListener("error", (event) => {
            reject(event.target.error);
        });
    });
};

const deleteSyncPlantFromIDB = (syncDataIDB, id) => {
    const transaction = syncDataIDB.transaction(["sync-plants"], "readwrite")
    const plantStore = transaction.objectStore("sync-plants")
    const deleteRequest = plantStore.delete(id)
    deleteRequest.addEventListener("success", () => {
        console.log("Deleted " + id)
    })
}
const deleteSyncCommentFromIDB = (syncDataIDB, id) => {
    const transaction = syncDataIDB.transaction(["sync-comments"], "readwrite")
    const commentStore = transaction.objectStore("sync-comments")
    const deleteRequest = commentStore.delete(id)
    deleteRequest.addEventListener("success", () => {
        console.log("Deleted " + id)
    })
}





