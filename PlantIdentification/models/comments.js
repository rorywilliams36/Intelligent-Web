let mongoose = require('mongoose');

// Get Schema class
let Schema = mongoose.Schema;

// Defines Schema for Comments Model
let CommentSchema = new Schema(
    {
        UserName: {type: String, required: true, max:100},
        Plant: {type: mongoose.Schema.Types.ObjectId, ref: 'plants'},
        Date: {type: Date, required: false},
        Comment: {type: String, required: false, max: 100}
    }
);

CommentSchema.set('toObject', {getters: true, virtuals: true});

// Create comment model using schema
let Comment = mongoose.model('comment', CommentSchema);

// Export Model
module.exports = Comment;