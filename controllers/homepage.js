const router = require('express').Router();

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        //res.redirect('/dashboard');
        res.send("<h1>Sucessfull Signin</h1>")
        return;
      }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
});

module.exports = router;