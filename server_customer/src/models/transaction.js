import { Sequelize, Model } from "sequelize";
import database from "../config/DatabaseConfig.js";
import Product from "./product.js";

class Transaction extends Model
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) { }
}
Transaction.init(
  {
    transaction_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    paid_price: {
      type: Sequelize.STRING,
    },
    order_id: {
      type: Sequelize.UUID,
    },
    payment_id: {
      type: Sequelize.UUID,
      defaultValue: 'cb888d36-40ec-4cbd-a60e-707de4326d30',
    },
    user_id: {
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
    modelName: "transaction",
    timestamps: false,
  }
);

export default Transaction;
