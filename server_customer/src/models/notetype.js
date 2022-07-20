import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
import Product from './product.js';
import moment from "moment"
class NoteType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
}
NoteType.init({
    note_type_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
    }
}, {
    sequelize: database,
    modelName: 'notetype',
    timestamps: false,
});

export default NoteType;