const router = require('express').Router();
const { User, Exercise } = require('../../models');

// `/api/exercise` HTML request endpoint

// Get exercise tracking data for all users; admin use only
router.get('/', (req, res) => {
    if (!req.session.loggedIn || req.session.user_id != 1) {
        res.redirect('/');
        return;
    }
    Exercise.findAll({
        include: [{ model: User, attributes: ['username'] }]
    })
    .then(exerciseData => res.json(exerciseData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get exercise tracking goal data for user
router.get('/goal', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Exercise.findOne({
        where: { user_id: req.session.user_id, track_type: 0 },
        include: { model: User, attributes: ['username'] }
    })
    .then(exerciseData => res.json(exerciseData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get exercise tracking achievement data for user
router.get('/achievements', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Exercise.findAll({
        where: { user_id: req.session.user_id, track_type: 1 },
        include: { model: User, attributes: ['username'] }
    })
    .then(exerciseData => res.json(exerciseData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get exercise tracking achievement data for user by date
router.get('/achievement/:date', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Exercise.findOne({
        where: { user_id: req.session.user_id, track_type: 1, record_date: req.params.date },
        include: { model: User, attributes: ['username'] }
    })
    .then(exerciseData => res.json(exerciseData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/trackcreate/:date/:cal', (req, res) => {
    Exercise.create({
        calorie_outake: req.params.cal,
        user_id: req.session.user_id,
        track_type: 1,
        record_date: req.params.date
    })
    .then(exerciseData => res.json(exerciseData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/goalcreate/:date/:cal', (req, res) => {
    Exercise.create({
        calorie_outake: req.params.cal,
        user_id: req.session.user_id,
        track_type: 0,
        record_date: req.params.date
    })
    .then(exerciseData => res.json(exerciseData))
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;