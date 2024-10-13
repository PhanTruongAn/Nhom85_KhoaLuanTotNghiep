"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      isLeader: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.INTEGER,
      },
      className: {
        type: Sequelize.STRING,
      },
      majorName: {
        type: Sequelize.STRING,
      },
      typeTraining: {
        type: Sequelize.STRING,
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Cho phép groupId là null
        references: {
          model: "Groups", // Tên bảng mà groupId tham chiếu đến
          key: "id", // Cột chính của bảng Groups
        },
        onDelete: "SET NULL", // Khi Group bị xóa, đặt groupId về null
        onUpdate: "CASCADE", // Khi groupId trong Groups được cập nhật, nó sẽ thay đổi tương ứng trong Students
      },
      majorId: {
        type: Sequelize.INTEGER,
      },
      notifications: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable("Students");
  },
};
