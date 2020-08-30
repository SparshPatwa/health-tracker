const router = require('express').Router();
const { User, Exercise } = require('../../models');

// `/api/exercise` HTML request endpoint

// Get exercise tracking achievement/goal data for all users
router.get('/', (req, res) => {
    Exercise.findAll({
      include: [{ model: User, attributes: ['username'] }]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get exercise tracking goal data for user by id
router.get('/goals/:id', (req, res) => {
    Exercise.findOne({
        where: { user_id: req.params.id, track_type: 0 },
        include: { model: User, attributes: ['username'] }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get exercise tracking achievement data for user by id
router.get('/achievements/:id', (req, res) => {
    Exercise.findAll({
        where: { user_id: req.params.id, track_type: 1 },
        include: { model: User, attributes: ['username'] }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get exercise tracking achievement data for user by id and date
router.get('/achievement/:id/:date', (req, res) => {
    Exercise.findAll({
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