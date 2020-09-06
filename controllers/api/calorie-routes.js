const router = require('express').Router();
const { User, Calorie } = require('../../models');

// `/api/calorie` HTML request endpoint

router.post('/', (req, res) => {
    let calorie = req.body;
    console.log(calorie)
    calorie.user_id = req.session.user_id;
    Calorie.create(calorie)
        .then(cal => res.json(cal))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Get calorie tracking achievement/goal data for all users
router.get('/', (req, res) => {
    console.log("user_id", req.session.user_id)
    if (!req.session.loggedIn || req.session.user_id == 1) {
        res.redirect('/');
        return;
    }
    Calorie.findAll({
            where: {
                user_id: req.session.user_id,
                ...req.query
            },
            include: [{ model: User, attributes: ['username'] }]
        })
        .then(dbPostData => res.json(dbPostData))
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
        .then(dbPostData => res.json(dbPostData))
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