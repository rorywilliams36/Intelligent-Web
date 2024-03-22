let mongoose = require('mongoose');

const plants = require('../models/plants');

const seedData = [
    {
        Plant_Name: 'Bluetips',
        Date_Seen: new Date('08-12-2023'),
        Location: '40.730610, -73.935242', // New York
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Light Blue',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'None',
        Height: 5,
        Spread: 5,
        Status: false,
        Username: "Ben123",
        Description: "Has bright blue"
    },
    {
        Plant_Name: 'Poison Ivy',
        Date_Seen: new Date('06-11-2023'),
        Location: '53.3827625, -1.4883414', // Sheffield
        Leaves: true,
        Flowers: false,
        Sun_Exposure: 'Partial Shade',
        Fruit_Seeds: 'None',
        Height: 10,
        Spread: 14,
        Status: false,
        Username: "Rory123",
        Description: "Gave me a rash"
    },
    {
        Plant_Name: 'Rose',
        Date_Seen: new Date('12-22-2023'),
        Location: '53.3814, -1.4746', // Sheffield City Centre
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Red',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 7.5,
        Spread: 2,
        Status: true,
        Username: "Ben123",
        Description: "Red and thorny"
    },
    {
        Plant_Name: 'Yew',
        Date_Seen: new Date('12-15-2023'),
        Location: '40.730610, -73.935242',
        Leaves: true,
        Flowers: false,
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 100,
        Spread: 100,
        Status: false,
        Username: "Theo999",
        Description: "Tree with lots of seeds"
    },
    {
        Plant_Name: 'Sunflower',
        Date_Seen: new Date('08-03-2024'),
        Location: '39.876019, -117.224121', // Nevada
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Yellow',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 15,
        Spread: 5,
        Status: false,
        Username: "Ben123",
        Description: "Tall yellow flower"
    },
    {
        Plant_Name: 'Cactus',
        Date_Seen: new Date('06-15-2023'),
        Location: '39.876019, -117.224121',
        Leaves: false,
        Flowers: true,
        Flower_Colour: 'Red',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 7,
        Spread: 5,
        Status: false,
        Username: "Rory123",
        Description: "Very prickly/spikey"
    },
    {
        Plant_Name: 'Apple Tree',
        Date_Seen: new Date('06-15-2023'),
        Location: '39.876019, -117.224121',
        Leaves: true,
        Flowers: false,
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Fruits and Seeds',
        Height: 12,
        Spread: 10,
        Status: true,
        Username: "Rory123"
    }
];

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
    await plants.deleteMany({});
    await plants.insertMany(seedData);
};

// Closes connection after seeding
seedDb().then(() => {
    mongoose.connection.close();
});

