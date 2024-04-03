require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api'); // Adjusted to specifically import API routes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes with '/api' prefix
app.use('/api', apiRoutes); // Changed to use the API routes under the '/api' prefix

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🚀 Connected on localhost:${PORT}`));
