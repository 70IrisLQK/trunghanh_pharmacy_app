import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
class RolePermission extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {

  }
}

RolePermission.init({
  role_permission_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  role_id: {
    type: Sequelize.UUID,
  },
  permission_id: {
    type: Sequelize.UUID,
  },
  created_at: {
    type: Sequelize.DATE
  },
  updated_at: {
    type: Sequelize.DATE
  }
}, {
  sequelize: database,
  modelName: 'rolepermission',
  timestamps: false
});

export default RolePermission