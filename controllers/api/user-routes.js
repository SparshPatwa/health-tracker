const router = require('express').Router();
const { User } = require('../../models');
const authenticate = require('../../util/authenticate');

// `/api/user` HTML request endpoint

// Get all users, endpoint=/api/user/
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get user by id, endpoint=/api/user/:id/
router.get('/:id', (req, res) => {
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
    User.destroy({
            where: { id: req.params.id },
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
    console.log("logout")
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;