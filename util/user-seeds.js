const { User } = require('../models');

const userData = [
    {
        firstname: "John",
        lastname: "Doe",
        username: "johndoe",
        email: "john.doe@email.com",
        password: "abcd1234",
    },
];
const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;