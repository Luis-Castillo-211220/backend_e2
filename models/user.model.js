import { getData } from '../config/dbConnection.js';
import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';
import { getDispositivo } from './dispositivos.model.js';

const User = getData.sequelizeClient.define('usuarios', {
    usuario_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: ''
        },
        validate: {
            notNull: {
                msg: 'Ingrese un correo'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese una contraseña'
            }
        }
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'Ingrese su numero de telefono'
            }
        }
    },
}, {
    tableName: 'usuarios',
    timestamps: false,
    freezeTableName: true,
    hooks: {
        beforeCreate: (user, options) => {
            {
                user.password = user.password && user.password != "" ? bcryptjs.hashSync(user.password, 10) : "";
            }
        }
    }

});

User.hasMany(getDispositivo.Dispositivo,{ 
    foreignKey: 'usuario_id',
    sourceKey: 'usuario_id'
});

getDispositivo.Dispositivo.belongsTo(User, {
    foreignKey: 'usuario_id',
    targetKey: 'usuario_id'
});


export const getUser = {User};
