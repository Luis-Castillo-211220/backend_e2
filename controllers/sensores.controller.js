// import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getDispositivo } from '../models/dispositivos.model.js'
import { getUser } from '../models/user.model.js'
import { getSensor } from '../models/sensores.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

//ponerlo en la tabla
const sensor_create = async (req, res) => {
    let temperatura = req.body.temperatura
    let humedad = req.body.humedad
    let voltaje = req.body.voltaje
    let hora = req.body.hora
    let fecha = req.body.fecha
    let dispositivo_id = req.body.dispositivo_id

    const disp = await getDispositivo.Dispositivo.findOne({ where: { dispositivo_id: dispositivo_id } });

    if(disp){
        getSensor.Sensor.create({
            temperatura: temperatura,
            humedad: humedad,
            voltaje: voltaje,
            hora: hora,
            fecha: fecha,
            dispositivo_id: dispositivo_id,
        }, { fields: ["temperatura", "humedad", "voltaje", "hora", "fecha", "dispositivo_id"] })
        .then(sensor => {
            res.send(sensor)
        })
        .catch(err => {
            res.status(400).send(err)
        });
    }else{
        return res.status(400).json({ error: "Dispositivo no reconocido" });
    }
}

const listAll = (req, res) => {
    
    getSensor.Sensor.findAll()
    .then((r) =>{
        res.send(r);
    })
    .catch((err) => {
        res.status(400).send(err);
    })

}


//mostrar en la tabla
//mostrar en la tabla
const getLatest = async (req, res) => {

    let dispositivo_id = req.params.dispositivo_id

    const disp = await getDispositivo.Dispositivo.findOne({ where: { dispositivo_id: dispositivo_id }})

    if(disp){
        const sens = await getSensor.Sensor.findAll({
            where: { dispositivo_id: dispositivo_id },
            attributes: ['fecha', 'hora', 'voltaje', 'humedad', 'temperatura', 'dispositivo_id'],
            order: [['registro_id', 'DESC']]
        })

        if(sens){
            res.send(sens)
        }else{
            res.status(400).json({error: "No se encontro registro"})
        }
    }else{
        res.status(400).json({error: "No se encontro el dispositivo"})
    }

}


export const sensorController = { sensor_create, listAll, getLatest }