'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      order_detail_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: "products",
          key: "product_id"
        }
      },
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: "orders",
          key: "order_id"
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
    await queryInterface.dropTable('OrderDetails');
  }
};