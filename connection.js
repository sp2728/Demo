var Sequelize = require('sequelize');
var config = require('./config/config');


const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password
  , { host: config.development.host, dialect: 'postgres', operatorsAliases: false });


sequelize.authenticate().then((db) => {
  console.log('Connection has been established successfully.');
}, (err) => { console.log(err) })

module.exports = sequelize;