const router = require('express').Router();

// importing other route files
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// setting up API routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
