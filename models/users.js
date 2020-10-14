const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

var Temperature = require('./temperature');


var User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
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
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'Active' 
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'Admin' 
    }
});


User.associate = (models)=>{
    User.hasMany(Model.Temperature)
}

User.sync({ alter: true })


module.exports = User;