let mongoose = require('mongoose');

const plants = require('../models/plants');

const seedData = [
    {
        _id: '60f3b3b3b3b3b3b3b3b3b3b2',
        Plant_Name: 'Cactus',
        Date_Seen: new Date('06-15-2023'),
        Location: '39.876019, -117.224121',
        Location_Name: 'Nevada, USA',
        Leaves: false,
        Flowers: true,
        Flower_Colour: 'Red',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 7,
        Spread: 5,
        Status: false,
        Username: "Rory123",
        Description: "Very prickly/spikey",
        Identification_Name: 'Cactus',
        Img: "public/images/uploads/592107912.jpg"
    },
    {
        _id: '60f3b3b3b3b3b3b3b3b3b3b0',
        Plant_Name: "Purple Daisy",
        Username: "Rory123",
        Date_Seen: new Date("2024-03-12T00:00:00.000Z"),
        Location: "53.3705589, -1.4938998",
        Location_Name: "Sheffield, GB",
        Description: "a couple of purple daisies",
        Height: 1,
        Spread: 2,
        Flowers: true,
        Flower_Colour: "Purple",
        Leaves: true,
        Sun_Exposure: "Full Sun",
        Fruit_Seeds: "Seeds Only",
        Status: false,
        Img: "public/images/uploads/1716484072701.jpeg",
        Identification_Name: 'Daisy'
    },
    {
        _id: '60f3b3b3b3b3b3b3b3b3b3b3',
        Plant_Name: 'Sunflower',
        Date_Seen: new Date('05-03-2024'),
        Location: '39.876019, -117.224121', // Nevada
        Location_Name: 'Nevada, USA',
        Leaves: true,
        Flowers: true,
        Flower_Colour: 'Yellow',
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 15,
        Spread: 5,
        Status: false,
        Username: "Ben123",
        Description: "Tall yellow flower",
        Identification_Name: 'Sunflower',
        Img: "public/images/uploads/4257912035.jpg"
    },
    {
        _id: '60f3b3b3b3b3b3b3b3b3b3b1',
        Plant_Name: 'Red Roses',
        Date_Seen: new Date('06-11-2023'),
        Location: '53.3827625, -1.4883414', // Sheffield
        Location_Name: 'Sheffield, GB',
        Leaves: true,
        Flowers: true,
        Sun_Exposure: 'Partial Shade',
        Fruit_Seeds: 'None',
        Height: 1,
        Spread: 1,
        Status: false,
        Username: "Rory123",
        Description: "A beautiful looking flock of red roses.",
        Identification_Name: 'Rose',
        Img: "public/images/uploads/2157901257.jpg"
    },
    {
        _id: '60f3b3b3b3b3b3b3b3b3b3b4',
        Plant_Name: 'Yew',
        Date_Seen: new Date('12-15-2023'),
        Location: '53.3814, -1.4746', // Sheffield City Centre
        Location_Name: 'Sheffield, GB',
        Leaves: true,
        Flowers: false,
        Sun_Exposure: 'Full Sun',
        Fruit_Seeds: 'Seeds Only',
        Height: 100,
        Spread: 100,
        Status: false,
        Username: "Theo999",
        Description: "Tree with lots of seeds",
        Identification_Name: 'Unknown'
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

