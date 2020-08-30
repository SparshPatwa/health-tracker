// Import models
const User = require('./User');
const Water = require('./Water');

// User model can be associated with multiple models.
User.hasMany(Water, {
    foreignKey: "user_id",
});

/*
User.hasMany(Exercise, {
    foreignKey: "user_id",
});
User.hasMany(Calorie, {
    foreignKey: "user_id",
});
*/

// Water model can be associated to User model only.
Water.belongsTo(User, {
    foreignKey: "user_id",
});
/*
Exercise.belongsTo(User, {
    foreignKey: "user_id",
});
Calorie.belongsTo(User, {
    foreignKey: "user_id",
});
*/

module.exports = {
    User,
    Water,
    /*
    Exercise,
    Calorie
    */
}