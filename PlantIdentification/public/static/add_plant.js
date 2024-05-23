const addNewPlant = () => {
    const txt_val = document.getElementById("submit-value").value
    openSyncPlantsIDB().then((db) => {
        addSyncPlant(db, txt_val);
    });
    navigator.serviceWorker.ready
        .then(function (serviceWorkerRegistration) {
            serviceWorkerRegistration.showNotification("Todo App",
                {body: "Todo added! - " + txt_val})
                .then(r =>
                    console.log(r)
                );
        });
}


window.onload = function () {
    // Add event listeners to buttons
    const create_btn = document.getElementById("create-plant")
    create_btn.addEventListener("click", addNewPlant)
}