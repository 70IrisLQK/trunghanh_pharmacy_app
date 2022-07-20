import { Sequelize, Model } from "sequelize";
import database from "../config/DatabaseConfig.js";

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {}
}

User.init(
  {
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.DATE,
      default: Date.now(),
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.STRING,
    },
    longitude: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
    role_id: {
      type: Sequelize.UUID,
      defaultValue: "810FBD0F-6009-46DB-B8E1-65E232FF16F9",
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
    modelName: "user",
    timestamps: false,
  }
);

export default User;
