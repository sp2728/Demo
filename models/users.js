const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');

var Temperature = require('./temperature');

class User extends Model { 

    getFullname(){
        return [this.firstName, this.lastName].join(" ");
    }
}

User.init({
    // Model attributes are defined here
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
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

User.associate = (models)=>{
    User.hasMany(models.Temperature,{
        onDelete:"cascade"
    })
}

module.exports = User;