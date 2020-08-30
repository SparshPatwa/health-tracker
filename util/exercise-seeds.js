const { Exercise } = require('../models');

const exerciseData = [
    {
        calorie_outake: 2000,
        user_id: 1,
        track_type: 0,
        record_date: "2020-01-01",
    },
    {
        calorie_outake: 1500,
        user_id: 1,
        track_type: 1,
        record_date: "2020-01-02",
    },
    {
        calorie_outake: 1800,
        user_id: 1,
        track_type: 1,
        record_date: "2020-01-03",
    }
];
const seedExercise = () => Exercise.bulkCreate(exerciseData);
module.exports = seedExercise;