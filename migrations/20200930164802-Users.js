'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('Users', 
     { id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull:false
      },
      email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull: false
      },
      password:{
        type:Sequelize.STRING,
        allowNull: false
      },
      firstName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName:{
        type: Sequelize.STRING,
        allowNull: false
      },
      role:{
        type: Sequelize.STRING,
        defaultValue: 'admin',
        allowNull: false
      },
      status:{
        type: Sequelize.STRING,
        defaultValue: 'active',
        allowNull: false
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
     * 
     */
    await queryInterface.dropTable('Users');
  }
};
