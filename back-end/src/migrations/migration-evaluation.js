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
      noteAdvisorLecturer: {
        type: Sequelize.STRING,
      },
      noteReviewLecturer: {
        type: Sequelize.STRING,
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      termId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
