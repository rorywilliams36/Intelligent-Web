
// Import model
const postModel = require('../models/posts');

// Function to create new plant instances
// Plant created using schema
exports.create = function(data, filePath) {
    let post = new postModel({
        UserName: data.user_name,
        Plant: data.plant,
        img: filePath
    });

    // Return plant instance
    return post.save().then(post => {
        console.log(post)
        return JSON.stringify(post);
    }).catch(err => {
        console.log(err);
        // If error occurs return null
        return null;
    });
}

// Return all items in collection
exports.getAll = function() {
    return postModel.find({}).then(posts => {
        return JSON.stringify(posts);
    }).catch(err => {
        console.log(err);

        // return null if error occurs
        return null;
    });
};