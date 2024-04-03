const db = require('../config/connection');
const { User, Thought } = require('../models');

const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.insertMany(userData);
  await Thought.insertMany(thoughtData);

  console.log('Database seeded!');
  process.exit(0);
});
