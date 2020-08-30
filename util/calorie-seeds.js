const { Calorie } = require('../models');

const calorieData = [
    {
        calorie_intake: 2000,
        user_id: 1,
        track_type: 0,
        record_date: "2020-01-01",
    },
    {
        calorie_intake: 2500,
        user_id: 1,
        track_type: 1,
        record_date: "2020-01-02",
    },
    {
        calorie_intake: 2300,
        user_id: 1,
        track_type: 1,
        record_date: "2020-01-03",
    }
];
const seedCalorie = () => Calorie.bulkCreate(calorieData);
module.exports = seedCalorie;