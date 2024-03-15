
// Import model
const commentModel = require('../models/comments');

// Function to create new plant instances
// Plant created using schema
exports.create = function(data) {
    let comment = new commentModel({
        Username: data.Username,
        Plant: data.Plant
    });

    // Return plant instance
    return comment.save().then(comment => {
        console.log(comment);
        return JSON.stringify(comment);
    }).catch(err => {
        console.log(err);
        // If error occurs return null
        return null;
    });
}

// Return all items in collection
exports.getAll = function() {
    return commentModel.find({}).then(comments => {
        return JSON.stringify(comments);
    }).catch(err => {
        console.log(err);
        // return null if error occurs
        return null;
    });
};