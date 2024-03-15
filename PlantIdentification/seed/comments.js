let mongoose = require('mongoose');
const comments = require('../models/comments');

const seedData = [
    {
        Username: "Rory123",
        Date: "2023-06-11T00:00:00.000Z",
        Plant: "65f442db3557f158eed19491",
        Comment: "This is a really nice looking Plant",
    },
    {
        Username: "Ben456",
        Date: "2023-06-12T00:00:00.000Z",
        Plant: "65f442db3557f158eed19491",
        Comment: "This is probably Poison Ivy",
    },
    {
        Username: "MCPlant",
        Date: "2023-06-13T00:00:00.000Z",
        Plant: "65f442db3557f158eed19491",
        Comment: "I agree with @Ben456",
    },
    {
        Username: "Ben456",
        Date: "2024-03-15T00:00:00.000Z",
        Plant: "65f442db3557f158eed19496",
        Comment: "Where did u find this?",
    },
    {
        Username: "Theo9999",
        Date: "2023-12-30T00:00:00.000Z",
        Plant: "65f442db3557f158eed19493",
        Comment: "Bad Quality Post :("
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