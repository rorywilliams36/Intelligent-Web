let mongoose = require('mongoose');

// Get Schema class
let Schema = mongoose.Schema;

// Defines Schema for Plant Model
let PlantSchema = new Schema({
        PlantName: {type: String, required: true, max:100},
        UserName: {type: String, required: true},
        Date_Seen: {type: Date, required: false},
        Location: {type: String, required: false, max: 100},
        Description: {type: String},
        Size: {type: Number, required: false},
        Flowers: {type: Boolean, required: false, default: false},
        Flower_Colour: {type: String, required: false},
        Leaves: {type: Boolean, required: false, default: false},
        Sun_Exposure: ['Full Sun', 'Partial Shade', 'Full Shade'],
        Fruit_Seeds: ['Fruit Only, Seeds Only, Fruits and Seeds, None'],
        Status: {type: Boolean, required: true}
    }
);

PlantSchema.set('toObject', {getters: true, virtuals: true});

// Create plant model using schema
let Plant = mongoose.model('plant', PlantSchema);

// Export Model
module.exports = Plant;