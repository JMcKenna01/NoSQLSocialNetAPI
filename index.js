require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes, both API and view
app.use(routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log mongoose queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🚀 Connected on localhost:${PORT}`));
