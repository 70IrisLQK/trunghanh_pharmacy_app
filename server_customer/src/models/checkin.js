import { Sequelize, Model } from "sequelize";
import database from "../config/DatabaseConfig.js";
import Product from "./product.js";
import moment from "moment";
class CheckIn extends Model
{
  static associate(models) { }
}
CheckIn.init(
  {
    check_in_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    location: {
      type: Sequelize.STRING,
    },
    duration: {
      type: Sequelize.FLOAT,
    },
    image: {
      type: Sequelize.JSON,
    },
    status: {
      type: Sequelize.ENUM(
        "Đóng cửa", 'Mở cửa'
      )
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
    modelName: "checkIn",
    timestamps: false,
  }
);

export default CheckIn;
