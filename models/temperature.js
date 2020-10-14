const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const User = require('./users');


var Temperature = sequelize.define('Temperature', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    temperature:{
        type: DataTypes.FLOAT,
        allowNull:false
    },  
    recordDateTime:{
        type: DataTypes.DATE,
        allowNull:false
    }  
});


Temperature.associate = (models)=>{
    Temperature.belongsTo(Model.User, {foreignKey:'userId'})
}

Temperature.sync({ alter: true })


module.exports = Temperature;