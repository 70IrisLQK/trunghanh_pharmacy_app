'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      role_permission_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: Sequelize.UUID,
        references: {
          model: "roles",
          key: "role_id"
        }
      },
      permission_id: {
        type: Sequelize.UUID,
        references: {
          model: "permissions",
          key: "permission_id"
        }
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermissions');
  }
};