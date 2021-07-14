const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('User', {
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        img: {type: DataTypes.JSON},
    });
};
