let mongoose = require('mongoose');
const comments = require('../models/comments');

const seedData = [
    {
        Username: "Rory123",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "60f3b3b3b3b3b3b3b3b3b3b3",
        Comment: "This is a really nice looking Plant",
    },
    {
        Username: "Ben456",
        Date: "2023-06-12T00:00:00.000Z",
        Plant: "60f3b3b3b3b3b3b3b3b3b3b3",
        Comment: "I love sunflowers!!",
    },
    {
        Username: "PlantLover123",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "60f3b3b3b3b3b3b3b3b3b3b2",
        Comment: "I love this plant",
    },
    {
        Username: "Tommy13253",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "60f3b3b3b3b3b3b3b3b3b3b2",
        Comment: "This plant is boring",
    },
    {
        Username: "Ben456",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "60f3b3b3b3b3b3b3b3b3b3b2",
        Comment: "Owch, spikey!",
    },
    {
        Username: "Tommy13253",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "60f3b3b3b3b3b3b3b3b3b3b1",
        Comment: "These look amazing!",
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
    await comments.deleteMany({});
    await comments.insertMany(seedData);
};

// Closes connection after seeding
seedDb().then(() => {
    mongoose.connection.close();
});