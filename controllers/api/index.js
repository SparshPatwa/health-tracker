const router = require('express').Router();

// Routing for /api/user/ HTML request
const userRoutes = require('./user-routes');
router.use('/user', userRoutes);

// Routing for /api/water/ HTML request
const waterRoutes = require('./water-routes');
router.use('/water', waterRoutes);

// Routing for /api/calorie/ HTML request
const calorieRoutes = require('./calorie-routes');
router.use('/calorie', calorieRoutes);

// Routing for /api/exercise/ HTML request
const exerciseRoutes = require('./exercise-routes');
router.use('/exercise', exerciseRoutes);

module.exports = router;