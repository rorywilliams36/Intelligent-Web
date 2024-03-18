// Import model
const plantModel = require('../models/plants');

// Function to create new plant instances
// Plant created using schema
exports.create = async function(data) {
    let plant = new plantModel(data);
    console.log(plant)
    try {
        await plantModel.insertMany(plant);
        console.log('Item added Successfully')
        return JSON.stringify(plant);
    }
    catch (e) {
        console.log(e)
        console.log('Error adding items to database');
        return null;
    }
};

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

// Function to retrieve a single plant by its ID
exports.getById = function(plantId) {
    return plantModel.findById(plantId).then(plant => {
        return JSON.stringify(plant);
    }).catch(err => {
        console.log(err);
        // Return null if error occurs
        return null;
    });
};