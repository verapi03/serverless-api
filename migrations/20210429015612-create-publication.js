'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Publications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      title: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addColumn(
      'Publications', // name of Source model
      'AuthorId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Publications');
    await queryInterface.removeColumn(
      'Publications', // name of Source model
      'AuthorId' // key we want to remove
    );
  }
};