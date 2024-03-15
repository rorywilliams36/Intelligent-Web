let mongoose = require('mongoose');

const plants = require('../models/plants');

const seedData = [
    {
        PlantName: 'Poison Ivy',
        Date: new Date('06-11-2023'),
        Location: 'Manchester',
        Leaves: true,
        Flowers: false,
        Sun_Exposure: 'Partial Shade',
        Fruit_Seeds: 'None',
        Size: 10,
        Status: false
    },
    {
        PlantName: 'Rose',
        Date: new Date('12-22-2023'),
        Location: 'Sheffield',
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Red',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds',
        Status: true
    },
    {
        PlantName: 'Bluetips',
        Date: new Date('08-12-2023'),
        Location: 'Brighton',
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Light Blue',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'None',
        Size: 5,
        Status: false
    },
    {
        PlantName: 'Yew',
        Date: new Date('12-15-2023'),
        Location: 'London',
        Leaves: true,
        Flowers: false,
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds',
        Size: 25,
        Status: false
    },
    {
        PlantName: 'Sunflower',
        Date: new Date('08-03-2024'),
        Location: 'Manchester',
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Yellow',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds',
        Size: 15,
        Status: false
    },
    {
        PlantName: 'Cactus',
        Date: new Date('06-15-2023'),
        Location: 'Nevada',
        Leaves: false,
        Flowers: true,
        Flower_Colour: 'Red',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds',
        Size: 7,
        Status: false
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

