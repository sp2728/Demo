const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const User = require('./users');
class Temperature extends Model { 

}

Temperature.init({
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temperature:{
        type: DataTypes.FLOAT,
        allowNull:false
    },  
    recordDateTime:{
        type: DataTypes.DATE,
        allowNull:false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Temperature' // We need to choose the model name
});

Temperature.associate= (models)=>{
    Temperature.belongsTo(models.User, {
        foreignKey:{
            allowNull:false
        }
    })
}



module.exports = Temperature;