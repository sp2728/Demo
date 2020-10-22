const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
var User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Admin'
    }
}, {});

User.associate = function(models) {
    User.hasMany(models.Temperature, {foreignKey:'userId', as:'temperature'});
  };

return User;
}
