import { Sequelize, Model } from 'sequelize';
import database from '../config/DatabaseConfig.js';
import moment from "moment"
class Pharmacy extends Model {
}
Pharmacy.init({
    pharmacy_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    CUSTOMER_CODE: {
        type: Sequelize.STRING
    },
    CUSTOMER_NAME: {
        type: Sequelize.STRING
    },
    CUSTOMER_ADDRESS: {
        type: Sequelize.STRING
    },
    DELIVERY_ADDRESS: {
        type: Sequelize.STRING
    },
    customer_tel: {
        type: Sequelize.STRING
    },
    handphone: {
        type: Sequelize.STRING
    },
    HANTT: {
        type: Sequelize.INTEGER
    },
    longitude: {
        type: Sequelize.FLOAT
    },
    latitude: {
        type: Sequelize.FLOAT
    },
    user_id: {
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
    modelName: 'pharmacy',
    timestamps: false
});

export default Pharmacy