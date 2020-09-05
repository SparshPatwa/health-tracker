const router = require('express').Router();
const { User, Water } = require('../../models');

// `/api/water` HTML request endpoint


router.post('/', (req, res) => {
    let water = req.body;
    console.log(water)
    water.user_id = req.session.user_id;
    Water.create(water)
        .then(wtr => res.json(wtr))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Get water tracking achievement/goal data for all users
router.get('/', (req, res) => {
    let query = req.query;
    console.log("query", query)
    Water.findAll({
            where: {
                user_id: req.session.user_id,
                ...query
            },
            include: [{ model: User, attributes: ['username'] }]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get water tracking goal data for user by id
router.get('/goals/:id', (req, res) => {
    Water.findOne({
            where: { user_id: req.params.id, track_type: 0 },
            include: { model: User, attributes: ['username'] }
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get water tracking achievement data for user by id
router.get('/achievements/:id', (req, res) => {
    Water.findAll({
            where: { user_id: req.params.id, track_type: 1 },
            include: { model: User, attributes: ['username'] }
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get water tracking achievement data for user by id and date
router.get('/achievement/:id/:date', (req, res) => {
    Water.findAll({
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