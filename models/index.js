// Import models
const User = require('./User');
const Water = require('./Water');
const Exercise = require('./Exercise');
const Calorie = require('./Calorie');

// User model can be associated with multiple models.
User.hasMany(Water, {
    foreignKey: "user_id",
});
User.hasMany(Exercise, {
    foreignKey: "user_id",
});
User.hasMany(Calorie, {
    foreignKey: "user_id",
});
// Water model can be associated to User model only.
Water.belongsTo(User, {
    foreignKey: "user_id",
});
// Exercise model can be associated to User model only.
Exercise.belongsTo(User, {
    foreignKey: "user_id",
});
// Calorie model can be associated to User model only.
Calorie.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = {
    User,
    Water,
    Exercise,
    Calorie
}