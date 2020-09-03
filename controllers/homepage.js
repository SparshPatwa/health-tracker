const router = require('express').Router();
const { User } = require('../models');

// `/` HTML request endpoint

// Render user home if signed-in, else render login page; endpoint=/
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/userhome');
        return;
    }
    res.redirect('/about');
});

router.get('/about', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('about');
});

router.get('/team', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('team');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/save-goal', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/');
    }
    res.render('save-goal', {
        loggedIn: true
    });
});

router.get('/userhome', (req, res) => {
    res.render('userhome', {
        loggedIn: true
    });
})

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
    // Render accountinfo page with user information ussing user id saved in session
    User.findOne({
            where: { id: req.session.user_id },
            attributes: { exclude: ['password', 'id'] }
        })
        .then(dbPostData => {
            const user = dbPostData.get({ plain: true });
            res.render('accountinfo', { loggedIn: true, user });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;