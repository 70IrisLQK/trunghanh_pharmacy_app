'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      order_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      shipping_address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      total_price: {
        type: Sequelize.FLOAT
      },
      dateOrdered: {
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id"
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
    await queryInterface.dropTable('Orders');
  }
};