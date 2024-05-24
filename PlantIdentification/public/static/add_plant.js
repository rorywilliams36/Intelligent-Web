const addNewPlant = () => {
    console.log('HHHHHHHHHHHHHHHH')
    console.log(document.forms[formName])

    var formData = new FormData(formEl);

    var name = formData.get('name');
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
    // Add event listeners to buttons
    window.addEventListener("DOMContentLoaded", (event) => {
        const el = document.getElementById('create-plant');
        if (el) {
            el.addEventListener('click', addNewPlant);
        }
    });
}