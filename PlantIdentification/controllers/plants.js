// Import model
const plantModel = require('../models/plants');
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
// Function to create new plant instances
// Plant created using schema
exports.create = async function(data, filepath) {
    data.Img = filepath;
    let plant = new plantModel(data);
    console.log(plant);

    try {
        // Save the plant to the database
        await plant.save();

        // Retrieve the location name using reverse geocoding
        const latitude = plant.Location.split(',')[0];
        const longitude = plant.Location.split(',')[1];
        plant.Location_Name = await this.reverseGeocode(latitude, longitude);
        console.log(plant.Location_Name);
        
        // Save the plant, including the Location_Name, to the database
        await plant.save();

        console.log('Item added Successfully');
        return JSON.stringify(plant);
    } catch (e) {
        console.log(e);
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
    // Sort plants based on sort_params
    if (sort == 'recent') {
        all_plants.sort((a, b) => {
            return new Date(b.Date_Seen) - new Date(a.Date_Seen);
        });
    } else if (sort == 'oldest') {
        all_plants.sort((a, b) => {
            return new Date(a.Date_Seen) - new Date(b.Date_Seen);
        });
    } else if (sort == 'location') {
        // Get user's location
        
    }
    return all_plants;
    
}

// Function to get a plant's reverse geolocation
exports.reverseGeocode = async function(latitude, longitude) {
    const key = 'AIzaSyBkyyod_8HYEyeEDqCQKd8od_F7nlITj5A';
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
    
    try {
        const response = await fetch(endpoint); // Wait for the fetch operation to complete
        const data = await response.json(); // Wait for parsing the response JSON
        
        if (data.status === 'OK') {
            const addressData = data.results[0].address_components;
            let city = null;
            let state = null;
            
            for (const component of addressData) {
                if (component.types.includes('administrative_area_level_2')) {
                    city = component.short_name;
                } else if (component.types.includes('administrative_area_level_1')) {
                    state = component.short_name;
                }
            }
            
            if (city && state) {
                return city + ', ' + state;
            }
        }
        
        return 'Unknown';
    } catch (error) {
        console.error('Error:', error);
        return 'Unknown';
    }
}

// Function to get a plant's location
exports.sortPlantsByLocation = function(all_plants) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(function(position) {
            let user_lat = position.latitude;
            let user_long = position.longitude;
            
            console.log('User location:', user_lat, user_long);

            // Go through each plant, find distance from user long/lat and sort by closest to furthest
            all_plants.sort((a, b) => {
                let a_plant_lat = parseFloat(a.Location.split(',')[0]);
                let a_plant_long = parseFloat(a.Location.split(',')[1]);
                
                let b_plant_lat = parseFloat(b.Location.split(',')[0]);
                let b_plant_long = parseFloat(b.Location.split(',')[1]);
                
                // Find distance of both from user
                let a_distance = Math.sqrt(Math.pow(user_lat - a_plant_lat, 2) + Math.pow(user_long - a_plant_long, 2));
                let b_distance = Math.sqrt(Math.pow(user_lat - b_plant_lat, 2) + Math.pow(user_long - b_plant_long, 2));

                return a_distance - b_distance;
            });
            resolve(all_plants);
        }, function(error) {
            reject(error);
        });
    });
};

