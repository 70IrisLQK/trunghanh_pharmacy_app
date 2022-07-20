'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      product_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      product_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      sale_price: {
        type: Sequelize.FLOAT
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      manufacture_date: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      expiration_date: {
        type: Sequelize.DATE,
        default: Date.now()
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: "categories",
          key: "category_id"
        }
      },
      unit_id: {
        type: Sequelize.UUID,
        references: {
          model: "units",
          key: "unit_id"
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('Products');
  }
};