const addNewPlant = (event,form) => {

    var formData = new FormData(form);
    let plant = {}
    for (let [key, value] of formData.entries()) {
        plant[key] = value
    }

    openSyncIDB().then((db) => {
        addSyncPlants(db, plant);
    });
    navigator.serviceWorker.ready
        .then(function (serviceWorkerRegistration) {
            serviceWorkerRegistration.showNotification("Plant App",
                {body: "Plant added!"})
                .then(r =>
                    console.log(r)
                );
        });
}


window.onload = function () {
    console.log('LOAD')
    const form = document.getElementById('PlantCreation');
    if (form) {
        console.log('LOADED')
        form.addEventListener('click', () => {addNewPlant(event, form)})
    }
}