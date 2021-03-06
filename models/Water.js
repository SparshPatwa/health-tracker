const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/connect');

class Water extends Model { }

Water.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    oz_intake: {
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
        allowNull: false
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'water'
}
);

module.exports = Water;