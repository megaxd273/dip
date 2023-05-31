'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('loads', 'date', {
      type: Sequelize.DATE,
      allowNull: false,
      primaryKey: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('loads', 'date', {
      type: Sequelize.DATE,
      allowNull: true,
      primaryKey: false
    });
  }
};
