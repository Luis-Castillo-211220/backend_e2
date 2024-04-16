import { getData } from '../config/dbConnection.js';
import { DataTypes } from 'sequelize';

const ConfAlerta = getData.sequelizeClient.define('conf_alertas', {
    conf_alerta_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    tipo_sensor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rango_max: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    rango_min: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tipo_alerta:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'conf_alertas',
    timestamps: false,
    freezeTableName: true,
});

export const getConfAlerta = { ConfAlerta };
