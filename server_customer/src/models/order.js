import { Sequelize, Model } from "sequelize";
import database from "../config/DatabaseConfig.js";
import moment from "moment";
class Order extends Model
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) { }
}
Order.init(
  {
    order_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    shipping_address: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM(
        "Chờ xác nhận",
        "Đã xác nhận",
        "Đang giao",
        "Đã giao",
        "Đã hủy",
        "Trả hàng"
      )
    },
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    total_price: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    debt_price: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    paid_price: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    payment_id: {
      type: Sequelize.UUID,
      defaultValue: 'cb888d36-40ec-4cbd-a60e-707de4326d30'
    },
    discount_price: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
    pharmacy_id: {
      type: Sequelize.UUID,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    updated_at: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize: database,
    modelName: "order",
    timestamps: false,
  }
);

export default Order;
