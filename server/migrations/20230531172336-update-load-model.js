'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('disciplines');
    await queryInterface.dropTable('LoadDiscipline');
    await queryInterface.addColumn('loads', 'discipline', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('disciplines', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    await queryInterface.createTable('LoadDiscipline', {
      loadId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'loads',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      disciplineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'disciplines',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.removeColumn('loads', 'discipline');
  }
};
