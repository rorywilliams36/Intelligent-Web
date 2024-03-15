let mongoose = require('mongoose');
const posts = require('../models/posts');

const seedData = [
    {
        UserName: "Rory123",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "65f1cbe9137a0266f20f6005",
        Description: "This is a really nice looking Plant",
        Status: false
    },
    {
        UserName: "Ben456",
        Date: "2024-03-15T00:00:00.000Z",
        Plant: "65f1cbe9137a0266f20f6009",
        Description: "This is a really nice looking Plant",
        Status: false
    },
    {
        UserName: "Theo9999",
        Date: "2023-12-30T00:00:00.000Z",
        Plant: "65f1cbe9137a0266f20f600a",
        Description: "This is a really nice looking Plant",
        Status: false
    }
]

const mongoDB = 'mongodb://localhost:27017/';
let connection;

mongoose.Promise = global.Promise;

// Connects to Database
mongoose.connect(mongoDB).then(result => {
    connection = result.connection;
    console.log('Connection Successful');
}).catch(err => {
    console.log('Connection Failed', err);
});

// Seeds data
const seedDb = async() => {
    console.log('Add Data')
    await posts.deleteMany({});
    await posts.insertMany(seedData);
};

// Closes connection after seeding
seedDb().then(() => {
    mongoose.connection.close();
});