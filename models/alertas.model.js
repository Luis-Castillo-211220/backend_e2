import { getData } from '../config/dbConnection.js';
import { DataTypes } from 'sequelize';

const Alerta = getData.sequelizeClient.define('alertas', {
    alerta_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    // hora:{
    //     type: DataTypes.DATE,
    //     allowNull: false,
    // },
    mensaje:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'alertas',
    timestamps: false,
    freezeTableName: true,
});

export const getAlerta = { Alerta };