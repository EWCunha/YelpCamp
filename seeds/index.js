if (process.env.NODE_env !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const dbUrl = process.env.DB_URL //|| 'mongodb://localhost:27017/yelp-camp';

connectMongoose().then(() => {
    console.log('Database connected!');
}).catch(err => {
    console.log('Database failed to connect!');
    console.log(err)
});

async function connectMongoose() {
    await mongoose.connect(dbUrl);
}

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '614bc9c97a260356dd0dbe9d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, pariatur incidunt, iure recusandae voluptate fugit ratione blanditiis ab maxime sed expedita placeat ad! Labore rem consequuntur maxime voluptatem ullam saepe?',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvz1cx7eq/image/upload/v1632182109/YelpCamp/photo-1564577160324-112d603f750f_ctd3bk.jpg',
                    filename: 'YelpCamp/photo-1564577160324-112d603f750f_ctd3bk'
                },
                {
                    url: 'https://res.cloudinary.com/dvz1cx7eq/image/upload/v1632182037/YelpCamp/photo-1497900304864-273dfb3aae33_ybahyj.jpg',
                    filename: 'YelpCamp/photo-1497900304864-273dfb3aae33_ybahyj'
                }
            ]
        });
        await camp.save()
    }
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database connection closed');
})
