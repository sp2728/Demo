var { Model } = require('sequelize');
var User = require('../models').User;


module.exports = (sequelize, DataTypes) => {
var Temperature = sequelize.define('Temperature', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    recordDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {});

Temperature.associate = function(models) {
    Temperature.belongsTo(models.User, {foreignKey:'userId', as:'user'})
  };

return Temperature;
}