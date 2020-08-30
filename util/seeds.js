const seedUser = require('./user-seeds');
const seedWater = require('./water-seeds');

const sequelize = require('./connect');

const seedMe = async () => {
    await sequelize.sync({ force: true });
    console.log('\n~~DB Syncronized~~\n');

    await seedUser();
    console.log('\n~~User Sedded~~\n');

    await seedWater();
    console.log('\n~~Water Sedded~~\n');

    process.exit(0);
};

seedMe();