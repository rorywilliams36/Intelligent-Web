// Import model
const plantModel = require('../models/plants');

// Function to create new plant instances
// Plant created using schema
exports.create = function(data) {
    let plant = new plantModel({
        PlantName: data.Plant_Name,
        Status: false
    });

    // Return plant instance
    return plant.save().then(plant => {
        console.log(plant);
        return JSON.stringify(plant);

    }).catch(err => {
        console.log(err);
        // If error occurs return null
        return null;
    });
}

// Return all items in collection
exports.getAll = function() {
    return plantModel.find({}).then(plants => {
        return JSON.stringify(plants);
    }).catch(err => {
        console.log(err);
        // return null if error occurs
        return null;
    });
};