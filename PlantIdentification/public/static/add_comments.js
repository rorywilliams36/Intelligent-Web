function addNewComment(plant_id){
    console.log('New Comment')
    const chat_msg = document.getElementById("chat_input").value
    const name = document.getElementById("name").value
    const comment = {"Username": name, "Plant": plant_id, "Comment" : chat_msg};
    openSyncIDB().then((db) => {
        addSyncComments(db, comment);
    });
    navigator.serviceWorker.ready
        .then(function (serviceWorkerRegistration) {
            serviceWorkerRegistration.showNotification("Plant App",
                {body: "Comment added!"})
                .then(r =>
                    console.log(r)
                );
        });
}