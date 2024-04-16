import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getDispositivo } from '../models/dispositivos.model.js'
import { getUser } from '../models/user.model.js'
import { confAlertasController } from './confAlertas.controller.js';
import { getConfAlerta } from '../models/confAlertas.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

const disp_create = async (req, res) => {

    let name = req.body.nombre
    let desc = req.body.descripcion
    let userid = req.body.usuario_id

    const user = await getUser.User.findOne({ where: { usuario_id: userid } });

    if (user) {
        getDispositivo.Dispositivo.create({
            nombre: name,
            descripcion: desc,
            usuario_id: userid,
        }, { fields: ["nombre", "descripcion", "usuario_id"] })
            .then(dispositivo => {
                res.send(dispositivo)
            })
            .catch(err => {
                res.status(400).send(err)
            });

    } else {
        return res.status(400).json({ error: "Usuario no encontrado" });
    }
};

const dispositivo_create = async (req, res) => {
    let name = req.body.nombre;
    let desc = req.body.descripcion;
    let userid = req.body.usuario_id;

    try {
        const user = await getUser.User.findOne({ where: { usuario_id: userid } });
        if (!user) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Crear dispositivo
        const dispositivo = await getDispositivo.Dispositivo.create({
            nombre: name,
            descripcion: desc,
            usuario_id: userid,
        }, { fields: ["nombre", "descripcion", "usuario_id"] });

        // Ahora llama a createConfDisp para crear las configuraciones de alerta
        createConfDisp(req, res, dispositivo.dispositivo_id, (error, confResult) => {
            if (error) {
                return res.status(400).send(error);
            }
            // Enviar respuesta final aquí, después de crear las configuraciones de alerta
            res.json({
                mensaje: "Dispositivo y configuraciones de alerta creadas con éxito",
                dispositivo_id: dispositivo.dispositivo_id, // Agregado dispositivo_id aquí
                dispositivo: dispositivo,
                configuraciones: confResult
            });
        });

    } catch (err) {
        res.status(400).send(err);
    }
};

const createConfDisp = async (req, res, dispositivo_id, callback) => {
    try {
        const configuraciones = [];

        const conf = await getConfAlerta.ConfAlerta.create({
            tipo_sensor: "temperatura",
            rango_max: 30,
            rango_min: 10,
            tipo_alerta: "telegram",
            dispositivo_id: dispositivo_id
        }, { fields: ["tipo_sensor", "rango_max", "rango_min", "tipo_alerta", "dispositivo_id"]});
        configuraciones.push(conf);

        const conf2= await getConfAlerta.ConfAlerta.create({
            tipo_sensor: "humedad",
            rango_max: 60,
            rango_min: 30, 
            tipo_alerta: "telegram",
            dispositivo_id: dispositivo_id
        }, { fields: ["tipo_sensor", "rango_max", "rango_min", "tipo_alerta", "dispositivo_id"]});
        configuraciones.push(conf2);

        const conf3 = await getConfAlerta.ConfAlerta.create({
            tipo_sensor: "Voltaje",
            rango_max: 120,
            rango_min: 30, 
            tipo_alerta: "telegram",
            dispositivo_id: dispositivo_id
        }, { fields: ["tipo_sensor", "rango_max", "rango_min", "tipo_alerta", "dispositivo_id"]});
        configuraciones.push(conf3);

        callback(null, configuraciones); // No hay error, enviar configuraciones
    } catch (err) {
        callback(err, null); // Enviar error
    }
};


const disp_list = async (req, res) => {
    let usuario_id = req.params.usuario_id

    const user = await getUser.User.findOne({ where: { usuario_id: usuario_id } });

    if (user) {
        getDispositivo.Dispositivo.findAll({
            where: {
                usuario_id: usuario_id, 
            }
        })
            .then((r) => {
                res.send(r);
            })
            .catch((err) => {
                res.status(400).send(err);
            })
    } else {
        return res.status(400).json({ error: "Usuario no encontrado" })
    }
};

const disp_listAll = (req, res) => {
    getDispositivo.Dispositivo.findAll()
        .then((r) => {
            res.send(r);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

export const dispositivoController = { disp_create, disp_list, disp_listAll, dispositivo_create };