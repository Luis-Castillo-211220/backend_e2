import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getAlerta } from '../models/alertas.model.js';
import { getDispositivo } from '../models/dispositivos.model.js';
import fetch from 'node-fetch';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})


const TELEGRAM_BOT_TOKEN = "7171664981:AAGuuF_qfxvOkydqXbFhSHcRadN3cRS637Q"; // Reemplaza esto con tu token real de Bot de Telegram
const TELEGRAM_CHAT_ID = "5746332908";



// const alerta_create = async (req, res) => {

//     let fecha = req.body.fecha
//     let mensaje = req.body.mensaje
//     let dispositivo_id = req.body.dispositivo_id

//     const disp = await getDispositivo.Dispositivo.findOne({where: {dispositivo_id: dispositivo_id}})

//     if(disp){
//         getAlerta.Alerta.create({
//             fecha: fecha,
//             mensaje: mensaje,
//             dispositivo_id: dispositivo_id
//         }, { fields: ["fecha", "mensaje", "dispositivo_id"]})
//         .then(alerta => {
//             res.send(alerta)
//         })
//         .catch(err => {
//             res.status(400).send(err)
//         })
//     }else{
//         return res.status(400).json({error: "Dispositivo no encontrado"})
//     }
// };

const alerta_create = async (req, res) => {
    let fecha = req.body.fecha;
    // let hora = req.body.hora;
    let mensaje = req.body.mensaje;
    let dispositivo_id = req.body.dispositivo_id;

    const disp = await getDispositivo.Dispositivo.findOne({where: {dispositivo_id: dispositivo_id}});

    if(disp){
        getAlerta.Alerta.create({
            fecha: fecha,
            // hora: hora,
            mensaje: mensaje,
            dispositivo_id: dispositivo_id
        }, { fields: ["fecha", "mensaje", "dispositivo_id"]})
        .then(alerta => {
            // Aquí enviamos el mensaje a Telegram
            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
            const telegramMessage = `${mensaje}`;
            
            fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: telegramMessage
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Mensaje enviado a Telegram exitosamente:', data);
            })
            .catch(err => {
                console.error('Error enviando mensaje a Telegram:', err);
            });

            res.send(alerta);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }else{
        return res.status(400).json({error: "Dispositivo no encontrado"});
    }
};


const alert_listAll = (req, res) => {

    getAlerta.Alerta.findAll()
    .then(alerta => {
        res.send(alerta)
    })
    .catch(err => {
        res.status(400).send(err    )
    })

};

const listByAlertID = (req, res) => {
    let alerta_id = req.body.alerta_id

    getAlerta.Alerta.findOne({ where: {alerta_id: alerta_id}})
    .then(alert =>{
        res.send(alert)
    })
    .catch(
        res.status(400).json({error: "No existe"})
    )
}

const listByDispID = async (req, res) => {
    let dispositivo_id = req.body.dispositivo_id

    const disp = await getDispositivo.Dispositivo.findOne({ where: {dispositivo_id: dispositivo_id}})

    if(disp){
        listAll(req, res);
    }else{
        return res.status(400).json({error: "Dispositivo no encontrado"})
    }

}

export const alertaController = { alerta_create, alert_listAll, listByAlertID, listByDispID }