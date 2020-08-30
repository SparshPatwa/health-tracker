const seedUser = require('./user-seeds');
const seedWater = require('./water-seeds');
const seedExercise = require('./exercise-seeds');
const seedCalorie = require('./calorie-seeds');

const sequelize = require('./connect');

const seedMe = async () => {
    await sequelize.sync({ force: true });
    console.log('\n~~healttracker database syncronized~~\n');

    await seedUser();
    console.log('\n~~User table sedded~~\n');

    await seedWater();
    console.log('\n~~Water table sedded~~\n');

    await seedExercise();
    console.log('\n~~Exercise table sedded~~\n');
    
    await seedCalorie();
    console.log('\n~~Calorie table sedded~~\n');

    process.exit(0);
};

seedMe();