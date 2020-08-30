const router = require('express').Router();

// Routing for / HTML request
const homepageRoute = require('./homepage');
router.use('/',homepageRoute);

// Routing for /api/ HTML request
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// Routing for all undefined HTML request
router.use((req, res) => {
  res.send("<h1>404 Page Not Found</h1>")
});

module.exports = router;