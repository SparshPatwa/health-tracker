const router = require('express').Router();

// Routing for /api/user/ HTML request
const userRoutes = require('./user-routes');
router.use('/user', userRoutes);

// Routing for /api/water/ HTML request
const waterRoutes = require('./water-routes');
router.use('/water', waterRoutes);

module.exports = router;