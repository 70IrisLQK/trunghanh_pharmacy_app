import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
import moment from "moment"
class Route extends Model
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models)
  {
  }
}
Route.init({
  route_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  route_name: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('Chưa hoàn thành', 'Đã hoàn thành'),
  },
  user_id: {
    type: Sequelize.UUID,
  },
  pharmacy_id: {
    type: Sequelize.UUID,
  },
  route_date: {
    type: Sequelize.DATE
  },
  week_date: {
    type: Sequelize.ENUM(
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ),
    defaultValue: "Monday",
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  }
}, {
  sequelize: database,
  modelName: 'route',
  timestamps: false
});

export default Route