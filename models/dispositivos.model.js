import { getData } from '../config/dbConnection.js';
import { DataTypes } from 'sequelize';
import { getUser } from './user.model.js';
import { getSensor } from './sensores.model.js';
import { getAlerta } from './alertas.model.js';
import { getConfAlerta } from './confAlertas.model.js';
// import bcryptjs from 'bcryptjs';

const Dispositivo = getData.sequelizeClient.define('dispositivos', {
    dispositivo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: ''
        },
        validate: {
            notNull: {
                msg: 'Ingrese un nombre'
            }
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese una contraseña'
            }
        }
    }
}, {
    tableName: 'dispositivos',
    timestamps: false,
    freezeTableName: true
});


Dispositivo.hasMany(getSensor.Sensor,{ 
    foreignKey: 'dispositivo_id',
    sourceKey: 'dispositivo_id'
});
getSensor.Sensor.belongsTo(Dispositivo, {
    foreignKey: 'dispositivo_id',
    targetKey: 'dispositivo_id'
});

Dispositivo.hasMany(getAlerta.Alerta, {
    foreignKey: 'dispositivo_id',
    sourceKey: 'dispositivo_id'
})

getAlerta.Alerta.belongsTo(Dispositivo, {
    foreignKey: 'dispositivo_id',
    targetKey: 'dispositivo_id'
})

Dispositivo.hasMany(getConfAlerta.ConfAlerta, {
    foreignKey: 'dispositivo_id',
    sourceKey: 'dispositivo_id'
})

getConfAlerta.ConfAlerta.belongsTo(Dispositivo, {
    foreignKey: 'dispositivo_id',
    targetKey: 'dispositivo_id'
})


export const getDispositivo = { Dispositivo };
