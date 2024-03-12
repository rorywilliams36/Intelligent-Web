let mongoose = require('mongoose');

// Get Schema class
let Schema = mongoose.Schema;

// Defines Schema for Comments Model
let PostSchema = new Schema(
    {
        UserName: {type: String, required: true, max:100},
        Plant: {type: String, require: false},
        Date: {type: Date},
        Description: {type: String, required: false, max: 255},
        Status: {type: Boolean, required: false},
        Img: {type: String}
    }
);

PostSchema.set('toObject', {getters: true, virtuals: true});

// Create comment model using schema
let Post = mongoose.model('post', PostSchema);

// Export Model
module.exports = Post;