let mongoose = require('mongoose');
const comments = require('../models/comments');

const seedData = [
    {
        UserName: "Rory123",
        Date: "2023-06-11T00:00:00.000Z",
        Post: "65f4254ead0c165174108175",
        Comment: "This is a really nice looking Plant",
    },
    {
        UserName: "Ben456",
        Date: "2023-06-12T00:00:00.000Z",
        Post: "65f4254ead0c165174108175",
        Comment: "This is probably Poison Ivy",
    },
    {
        UserName: "MCPlant",
        Date: "2023-06-13T00:00:00.000Z",
        Post: "65f4254ead0c165174108175",
        Comment: "I agree with @Ben456",
    },
    {
        UserName: "Ben456",
        Date: "2024-03-15T00:00:00.000Z",
        Post: "65f4254ead0c165174108177",
        Comment: "Where did u find this?",
    },
    {
        UserName: "Theo9999",
        Date: "2023-12-30T00:00:00.000Z",
        Post: "65f4254ead0c165174108176",
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