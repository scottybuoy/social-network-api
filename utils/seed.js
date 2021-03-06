const connection = require('../config/connection');
const { User, Thought } = require('../models');
const users = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});
    
    // Drop existing thoughts
    await Thought.deleteMany({});

    // Add users to the collection
    await User.collection.insertMany(users);

    // Add thoughts to collection
    // await Thought.collection.insertMany(thoughts);

    // Log out seed data to display what will appear in database
    console.table(users);
    console.info('Seeding complete!')
    process.exit(0);
});