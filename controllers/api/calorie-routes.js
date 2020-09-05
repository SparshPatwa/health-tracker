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

// Get calorie tracking goal data for user by id
router.get('/goals/:id', (req, res) => {
    Calorie.findOne({
            where: { user_id: req.params.id, track_type: 0 },
            include: { model: User, attributes: ['username'] }
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get calorie tracking achievement data for user by id
router.get('/achievements/:id', (req, res) => {
    Calorie.findAll({
            where: { user_id: req.params.id, track_type: 1 },
            include: { model: User, attributes: ['username'] }
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get calorie tracking achievement data for user by id and date
router.get('/achievement/:id/:date', (req, res) => {
    Calorie.findAll({
            where: { user_id: req.params.id, track_type: 1, record_date: req.params.date },
            include: { model: User, attributes: ['username'] }
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;