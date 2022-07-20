import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
import Product from './product.js';
import moment from 'moment'
class Note extends Model
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
Note.init({
    note_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.STRING
    },
    reply_note: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.JSON
    },
    reply_note: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM('Chờ xử lý', 'Hoàn thành'),
    },
    user_id: {
        type: Sequelize.UUID,
    },
    note_type_id: {
        type: Sequelize.UUID,
    },
    pharmacy_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
    }
}, {
    sequelize: database,
    modelName: 'note',
    timestamps: false,
});

export default Note;