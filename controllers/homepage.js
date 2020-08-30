const router = require('express').Router();

// `/` HTML request endpoint

// Render user home if signed-in, else render login page; endpoint=/
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render('userhome');
        return;
      }
    res.render('login');
});

// Redirect to `/` if signed-in, else render singup page; endpoint=/signup/ 
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
});

module.exports = router;