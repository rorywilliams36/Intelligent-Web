// Import model
const plantModel = require('../models/plants');

// Function to create new plant instances
// Plant created using schema
exports.create = async function(data, filepath) {
    data.Img = filepath;
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
    });
};

// Function to retrieve a single plant by its ID
exports.getById = function(plantId) {
    return plantModel.findById(plantId).then(plant => {
        return JSON.stringify(plant);
    });
};

// Function to filter plants
exports.filterPlants = function(all_plants, filter_params) {
    console.log('Function called!')
    // Filter plants based on filter_params
    let filteredPlants = all_plants.filter(plant => {
        // Check each filter parameter and apply corresponding filter
        // ?identification_true=on&identification_false=on
        if (filter_params.identification) {
            if (filter_params.identification == 'true' && !plant.Status == true) {
                return false; // Filter out plants not matching
            }
            if (filter_params.identification == 'false' && !plant.Status == false) {
                return false; // Filter out plants not matching
            }
        }
        // &with_flowers=on&without_flowers=on
        if (filter_params.flowers) {
            if (filter_params.flowers == 'true' && !plant.Flowers == true) {
                return false; // Filter out plants not matching
            }
            if (filter_params.flowers == 'false' && !plant.Flowers == false) {
                return false; // Filter out plants not matching
            }
        }
        // &with_leaves=on&without_leaves=on
        if (filter_params.leaves) {
            if (filter_params.leaves == 'true' && !plant.Leaves == true) {
                return false; // Filter out plants not matching
            }
            if (filter_params.leaves == 'false' && !plant.Leaves == false) {
                return false; // Filter out plants not matching
            }
        }
        // &with_seeds=on&with_fruits=on
        if (filter_params.fruits) {
            console.log(plant.Plant_Name, plant.Fruit_Seeds[0])
            if (filter_params.fruits == 'seed' && plant.Fruit_Seeds[0] !== 'Seeds Only') {
                return false; // Filter out plants not matching
            }
            if (filter_params.fruits == 'fruit_seed' && plant.Fruit_Seeds[0] !== 'Fruits and Seeds') {
                return false; // Filter out plants not matching
            }
            if (filter_params.fruits == 'fruit' && plant.Fruit_Seeds[0] !== 'Fruit Only') {
                return false; // Filter out plants not matching
            }
            if (filter_params.fruits == 'none' && plant.Fruit_Seeds[0] !== 'None') {
                return false; // Filter out plants not matching
            }
        }

        return true; // Plant passed all filters
    });
    return filteredPlants;
};

// Function to sort plants by either date or geolocation
exports.sortPlants = function(all_plants, sort) {
    console.log(sort)
    console.log('Before sorting: ', all_plants[0]);
    // Sort plants based on sort_params
    if (sort == 'recent') {
        console.log('Sorting by: recent ', sort);
        all_plants.sort((a, b) => {
            return new Date(b.Date_Seen) - new Date(a.Date_Seen);
        });
    } else if (sort == 'oldest') {
        console.log('Sorting by: oldest ', sort);
        all_plants.sort((a, b) => {
            return new Date(a.Date_Seen) - new Date(b.Date_Seen);
        });
    } else if (sort == 'location') {
        console.log('Sorting by: location ', sort);
        all_plants.sort((a, b) => {
            return b.Location.localeCompare(a.Location);
        });
    }
    console.log('After sorting: ', all_plants[0]);
    return all_plants;
}