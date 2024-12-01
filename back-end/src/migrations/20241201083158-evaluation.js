"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Evaluations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      discussionPoint: {
        type: Sequelize.DOUBLE,
      },
      progressPoint: {
        type: Sequelize.DOUBLE,
      },
      reportingPoint: {
        type: Sequelize.DOUBLE,
      },
      averagePoint: {
        type: Sequelize.DOUBLE,
      },
      lecturerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Lecturers", key: "id" },
        onDelete: "CASCADE",
      },
      groupLecturerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "GroupLecturers", key: "id" },
        onDelete: "CASCADE",
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Groups", key: "id" },
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
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Evaluations");
  },
};
