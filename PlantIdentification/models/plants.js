let mongoose = require('mongoose');

// Get Schema class
let Schema = mongoose.Schema;

// Defines Schema for Plant Model
let PlantSchema = new Schema(
    {
            PlantName: {type: String, required: true, max:100},
        Date: {type: Date, required: false},
        Location: {type: String, required: false, max: 100},
        Size: {type: Number, required: false},
        Characteristics: {type: String, required: false},
        Status: {type: Boolean, required: true},
        ScientificName: {type: String, required: false}
    }
);

PlantSchema.set('toObject', {getters: true, virtuals: true});

// Create plant model using schema
let Plant = mongoose.model('plant', PlantSchema);

// Export Model
module.exports = Plant;