"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TermStudent", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      termId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Terms",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // allowNull: false,
      },
      studentId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Students",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("TermStudent");
  },
};
