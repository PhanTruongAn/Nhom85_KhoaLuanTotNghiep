"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Terms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      endChooseGroupDate: {
        type: Sequelize.DATE,
      },
      endChooseTopicDate: {
        type: Sequelize.DATE,
      },
      endDiscussionDate: {
        type: Sequelize.DATE,
      },
      endPublicResultDate: {
        type: Sequelize.DATE,
      },
      endPublicTopicDate: {
        type: Sequelize.DATE,
      },
      endReportDate: {
        type: Sequelize.DATE,
      },
      startChooseGroupDate: {
        type: Sequelize.DATE,
      },
      startChooseTopicDate: {
        type: Sequelize.DATE,
      },
      startDiscussionDate: {
        type: Sequelize.DATE,
      },
      startPublicResultDate: {
        type: Sequelize.DATE,
      },
      startPublicTopicDate: {
        type: Sequelize.DATE,
      },
      endReportDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Terms");
  },
};
