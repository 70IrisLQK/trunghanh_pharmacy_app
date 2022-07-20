import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
import moment from "moment"
class OrderDetail extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    OrderDetail.belongsTo(models.Product);
    OrderDetail.belongsTo(models.Order);
  }
}
OrderDetail.init({
  order_detail_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.STRING
  },
  unit: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  order_id: {
    type: Sequelize.UUID,
  },
  product_id: {
    type: Sequelize.UUID,
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  }
}, {
  sequelize: database,
  modelName: 'orderdetail',
  timestamps: false
});

export default OrderDetail