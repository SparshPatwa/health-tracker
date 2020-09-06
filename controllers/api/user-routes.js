const router = require('express').Router();
const { User } = require('../../models');
const authenticate = require('../../util/authenticate');

// `/api/user` HTML request endpoint

// Get all users, admin use only
router.get('/', (req, res) => {
    if (!req.session.loggedIn || req.session.id != 1) {
        res.redirect('/');
        return;
    }
    User.findAll({
          attributes: {exclude: ['password']}
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
          console.log(err);
          res.status(500).json(err);
    });
});

// Get user by id, admin use only
router.get('/:id', (req, res) => {
    if (!req.session.loggedIn || req.session.id != 1) {
        res.redirect('/');
        return;
    }
    User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password', 'id'] }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Delete a user by id
router.delete('/:id', authenticate, (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    User.destroy({
        where: { id: req.params.user_id },
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Post new user, endpoint=/api/user/
router.post('/', (req, res) => {
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        // Save user attributes for session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    })
});

// Login existing user, endpoint=/api/user/login/
router.post('/login', (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        //check password from database
        const validPassword = userData.passwordCheck(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // Save user attributes for session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    });
});

// Logout logged-in user, endpoint=/api/user/logout/
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
});

module.exports = router;