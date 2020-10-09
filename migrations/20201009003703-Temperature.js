'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Temperatures', 
    { id: {
       type: Sequelize.INTEGER,
       autoIncrement:true,
       primaryKey: true
     },
     email:{
       type:Sequelize.STRING,
       allowNull: false
     },
     temperature:{
      type: Sequelize.FLOAT,
      allowNull:false
     },
     recordDateTime:{
      type: Sequelize.DATE,
      allowNull:false
     },
     createdAt: {
       type: Sequelize.DATE
     },
     updatedAt: {
       type: Sequelize.DATE
     }
   });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Temperatures');

  }
};
