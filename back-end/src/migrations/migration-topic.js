"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Topics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      goals: {
        type: Sequelize.TEXT,
      },
      requirement: {
        type: Sequelize.TEXT,
      },
      standardOutput: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      quantityGroup: {
        type: Sequelize.INTEGER,
      },
      lecturerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Lecturers", key: "id" },
        onDelete: "CASCADE",
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Terms", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Topics");
  },
};
