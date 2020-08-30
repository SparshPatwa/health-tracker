const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/connect');
const encrypt = require('bcrypt');

class User extends Model { 
    // Function to compared encrypted passwords
    passwordCheck(inputPassword) {
        return encrypt.compareSync(inputPassword, this.password);
    }
}

User.init(
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        hooks: 
        {
            async beforeCreate(newUserData) {
                newUserData.password = await encrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await encrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        }
    }
);
module.exports = User;
