import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
class Role extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Role.belongsTo(models.User)
  }
}

Role.init({
  role_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
}, {
  sequelize: database,
  modelName: 'role',
  timestamps: false
});

export default Role