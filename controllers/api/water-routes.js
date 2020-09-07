const router = require('express').Router();
const { User, Water } = require('../../models');

// `/api/water` HTML request endpoint

// Get water tracking data for all users, admin use only
router.get('/', (req, res) => {
    if (!req.session.loggedIn || req.session.user_id != 1) {
        res.redirect('/');
        return;
    }
    Water.findAll({
        include: [{ model: User, attributes: ['username'] }]
    })
    .then(waterData => res.json(waterData))
    .catch(err => {
          console.log(err);
        res.status(500).json(err);
    });
});

// Get water tracking goal data for user
router.get('/goal', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Water.findOne({
        where: { user_id: req.session.user_id, track_type: 0 },
        include: { model: User, attributes: ['username'] }
    })
    .then(waterData => res.json(waterData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get water tracking achievement data for user
router.get('/achievements', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Water.findAll({
        where: { user_id: req.session.user_id, track_type: 1 },
        include: { model: User, attributes: ['username'] }
    })
    .then(waterData => res.json(waterData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Get water tracking achievement data for user by date
router.get('/achievement/:date', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Water.findAll({
        where: { user_id: req.session.user_id, track_type: 1, record_date: req.params.date },
        include: { model: User, attributes: ['username'] }
    })
    .then(waterData => res.json(waterData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/trackcreate/:date/:oz', (req, res) => {
    Water.create({
        oz_intake: req.params.oz,
        user_id: req.session.user_id,
        track_type: 1,
        record_date: req.params.date
    })
    .then(waterData => res.json(waterData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/goalcreate/:date/:oz', (req, res) => {
    Water.create({
        oz_intake: req.params.oz,
        user_id: req.session.user_id,
        track_type: 0,
        record_date: req.params.date
    })
    .then(waterData => res.json(waterData))
    .catch(err => {
        res.status(500).json(err);
    });
});
/*
router.put('/trackupdate/:date/:oz', (req, res) => {
    Water.update(
        {
            oz_intake: req.params.oz
        },
        {
            where: { user_id: req.session.user_id, track_type: 1, record_date: req.params.date }
        }
    )
    .then(waterData => res.json(waterData))
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/track/:date/:oz', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Water.findOne({
        where: { user_id: req.session.user_id, track_type: 1, record_date: req.params.date },
        include: { model: User, attributes: ['username'] }
    })
    .then(waterData => {
        if (!waterData) {
            res.redirect('/api/water/trackcreate/'+req.params.date+'/'+req.params.oz);
        } else {
            res.redirect('/api/water/trackupdate/'+req.params.date+'/'+req.params.oz);        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
*/
module.exports = router;