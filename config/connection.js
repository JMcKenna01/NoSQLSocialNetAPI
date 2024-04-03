const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

// Define the MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the database connection
module.exports = db;
