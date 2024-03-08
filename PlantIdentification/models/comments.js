let mongoose = require('mongoose');

// Get Schema class
let Schema = mongoose.Schema;

// Defines Schema for Comments Model
let CommentSchema = new Schema(
    {
        UserName: {type: String, required: true, max:100},
        Post: {type: String, require: true},
        Date: {type: Date, required: false, max: 50},
        Comment: {type: String, required: false, max: 100}
    }
);

CommentSchema.set('toObject', {getters: true, virtuals: true});

// Create comment model using schema
let Comment = mongoose.model('comment', CommentSchema);

// Export Model
module.exports = Comment;