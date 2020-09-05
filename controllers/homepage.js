const router = require('express').Router();
const { User, Water } = require('../models');

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

// Redirect to `/` in not signed in, else render account info page; endpont=/accountinfo/
router.get('/accountinfo', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Render accountinfo page with user information ussing user id saved in session.
  User.findOne({
    where: { id: req.session.user_id },
    attributes: { exclude: ['password', 'id'] }
  })
  .then(dbPostData => {
    const user = dbPostData.get({ plain: true });
    res.render('accountinfo', {user});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;