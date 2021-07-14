const {DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Dog', {
        name: {type: DataTypes.STRING, allowNull: false},
        weight_min: {type: DataTypes.INTEGER, allowNull: false},
        weight_max: {type: DataTypes.INTEGER, allowNull: false},
        height: {type: DataTypes.JSON, allowNull: false},
        life_span: {type: DataTypes.STRING},
        img: {type: DataTypes.JSON},
        created: {type: DataTypes.STRING},
    });
};
