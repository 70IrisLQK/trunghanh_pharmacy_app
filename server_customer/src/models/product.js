import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Product.belongsTo(models.Unit);
    Product.belongsTo(models.Category);
    Product.hasMany(models.OrderDetail);
  }
}

Product.init({
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
  unit_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  manufacture_date: {
    type: Sequelize.DATE,
    default: Date.now()
  },
  expiration_date: {
    type: Sequelize.DATE,
    default: Date.now()
  },
  isActive: {
    type: Sequelize.BOOLEAN,
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  }
}, {
  sequelize: database,
  modelName: 'product',
  timestamps: false
});

export default Product;