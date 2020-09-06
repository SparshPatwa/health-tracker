const router = require('express').Router();
const { User, Calorie } = require('../../models');

// `/api/calorie` HTML request endpoint

// Get calorie tracking data for all users, admin use only
router.get('/', (req, res) => {
    if (!req.session.loggedIn || req.session.user_id != 1) {
        res.redirect('/');
        return;
    }
    Calorie.findAll({
        include: [{ model: User, attributes: ['username'] }]
    })
    .then(calorieData => res.json(calorieData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get calorie tracking goal data for user
router.get('/goal', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Calorie.findOne({
        where: { user_id: req.session.user_id, track_type: 0 },
        include: { model: User, attributes: ['username'] }
    })
    .then(calorieData => res.json(calorieData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get calorie tracking achievement data for user
router.get('/achievements', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Calorie.findAll({
        where: { user_id: req.session.user_id, track_type: 1 },
        include: { model: User, attributes: ['username'] }
    })
    .then(calorieData => res.json(calorieData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get calorie tracking achievement data for user date
router.get('/achievement/:date', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Calorie.findOne({
        where: { user_id: req.session.user_id, track_type: 1, record_date: req.params.date },
        include: { model: User, attributes: ['username'] }
    })
    .then(calorieData => res.json(calorieData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/trackcreate/:date/:cal', (req, res) => {
    Calorie.create({
        calorie_intake: req.params.cal,
        user_id: req.session.user_id,
        track_type: 1,
        record_date: req.params.date
    })
    .then(calorieData => res.json(calorieData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/goalcreate/:date/:cal', (req, res) => {
    Calorie.create({
        calorie_intake: req.params.cal,
        user_id: req.session.user_id,
        track_type: 0,
        record_date: req.params.date
    })
    .then(calorieData => res.json(calorieData))
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;