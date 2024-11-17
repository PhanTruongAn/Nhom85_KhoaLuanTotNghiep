"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StudentGroups", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: "Students", key: "id" },
        // onDelete: "CASCADE",
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: { model: "Groups", key: "id" },
        // onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("StudentGroups");
  },
};
