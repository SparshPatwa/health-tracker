const { Water } = require('../models');

const waterData = [
    {
        oz_intake: 10,
        user_id: 1,
        track_type: 0,
        record_date: "2020-01-01",
    },
    {
        oz_intake: 7,
        user_id: 1,
        track_type: 1,
        record_date: "2020-01-02",
    },
    {
        oz_intake: 9,
        user_id: 1,
        track_type: 1,
        record_date: "2020-01-03",
    }
];
const seedWater = () => Water.bulkCreate(waterData);
module.exports = seedWater;