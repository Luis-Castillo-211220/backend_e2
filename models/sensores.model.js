import { getData } from '../config/dbConnection.js';
import { DataTypes } from 'sequelize';

const Sensor = getData.sequelizeClient.define('registro_sensores', {
    registro_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    temperatura: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    humedad: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    voltaje: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    hora:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'registro_sensores',
    timestamps: false,
    freezeTableName: true,
});

export const getSensor = { Sensor };
