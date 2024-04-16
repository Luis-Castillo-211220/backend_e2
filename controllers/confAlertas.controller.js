import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getDispositivo } from '../models/dispositivos.model.js'
import { getUser } from '../models/user.model.js'
import { getSensor } from '../models/sensores.model.js';
import { getConfAlerta } from '../models/confAlertas.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})


const conf_create = async (req, res) => {

    let tipo_sensor = req.body.tipo_sensor
    let rango_max = req.body.rango_max
    let rango_min = req.body.rango_min
    let tipo_alerta = req.body.tipo_alerta
    let dispositivo_id = req.body.dispositivo_id

    const disp = await getDispositivo.Dispositivo.findOne({ where: {dispositivo_id: dispositivo_id}})

    if(disp){
        getConfAlerta.ConfAlerta.create({
            tipo_sensor: tipo_sensor,
            rango_max: rango_max,
            rango_min: rango_min,
            tipo_alerta: tipo_alerta,
            dispositivo_id: dispositivo_id
        }, { fields: ["tipo_sensor", "rango_max", "rango_min", "tipo_alerta", "dispositivo_id"]})
        .then(conf => {
            res.send(conf)
        })
        .catch(err =>{
            res.status(400).send(err)
        })
    }else{
        return res.status(400).json({error: "Dispositivo no encontrado"})
    }

}

const listAll = (req, res) => {

    getConfAlerta.ConfAlerta.findAll()
    .then(conf => {
        res.send(conf)
    })
    .catch(err => {
        res.status(400).send(err)
    })
}

const getConfByDispId = async (req, res) => {
    try {
        let dispositivo_id = req.params.dispositivo_id;

        const conf = await getConfAlerta.ConfAlerta.findAll({
            where: { dispositivo_id: dispositivo_id }
        });
        
        if (conf.length > 0) {
            res.send(conf);
        } else {
            res.status(404).json({ error: "No se encontraron configuraciones o el dispositivo no existe" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la consulta a la base de datos" });
    }
}

//modifciar para que se actualicen parcial
const updateConfAlerta = async (req, res) => {
    const { conf_alerta_id } = req.params;
    const updatedFields = req.body; // Obtener todos los campos enviados en la solicitud

    try {
        const conf = await getConfAlerta.ConfAlerta.findOne({ where: { conf_alerta_id: conf_alerta_id } });

        if (!conf) {
            return res.status(404).json({ error: "Configuración de alerta no encontrada" });
        }

        // Actualizar cada campo solo si está presente en la solicitud
        for (const field in updatedFields) {
            if (Object.prototype.hasOwnProperty.call(updatedFields, field)) {
                conf[field] = updatedFields[field];
            }
        }

        const updatedConf = await conf.save();

        res.json(updatedConf);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la configuración de la alerta" });
    }
}

export const confAlertasController = { conf_create, listAll, getConfByDispId, updateConfAlerta }