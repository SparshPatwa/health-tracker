const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/connect');

class Exercise extends Model {}

Exercise.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calorie_outake: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    track_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0, // This represents GOAL
            max: 1 // This represents ACHIEVEMENT
        }
    },
    record_date: {
        type: DataTypes.DATEONLY,
        defaultValue: Date.now,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise'
});

module.exports = Exercise;