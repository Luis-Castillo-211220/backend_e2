import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getUser } from '../models/user.model.js'
import e from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
    path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`)
})

const user_create = (req, res) => {
    getUser.User.create({
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
    }, { fields: ["email", "password", "phone_number"] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(400).send(err)
        });
};

const user_login = async (req, res) => {
    try {
        const user = await getUser.User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcryptjs.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'contraseña no válida' });
        }

        const token = jwt.sign({
            sub: user.id,
            id: user.usuario_id,
        }, 'secret', { expiresIn: '30m' });

        res.header('auth-token', token).json({
            error: null,
            data: {
                token,
                usuario_id: user.usuario_id,
                email: user.email,
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
        console.error(error);
    }
};


const login = async (req, res) => {
    const user = await getUser.User.findOne({ where: { email: req.body.email } });

    if (user) {
        const validPassword = bcryptjs.compareSync(
            req.body.password,
            user.password
        );

        // if (user.estado === true) {
        // } else {
        //     return res.status(400).json({ error: "Usuario no verificado" });
        // }
        if (validPassword) {
            const token = jwt.sign(
                {
                    id: user.id,
                },
                "secret",
                { expiresIn: "30m" },
                data.parsed.JWT_TOKEN_SECRET,
                { algorithm: "HS256" }
            );

            user.token = token;

            res.header("auth-token", token).json({
                error: null,
                data: {
                    token,
                    user: user.id,
                },
            });

        } else {
            if (!validPassword)
                return res.status(400).json({ error: "contraseña no válida" });
        }

    } else {
        return res.status(400).json({ error: "Usuario no encontrado" });
    }

};


const listAll = (req, res) => {
    getUser.User.findAll()
    .then(user => {
        res.send(user)
    })
    .catch(err =>{
        res.status(400).send(err)
    })
}

const listByUserId = (req, res) => {
    let usuario_id = req.body.usuario_id

    getUser.User.findOne({ where: {usuario_id: usuario_id}})
    .then(user => {
        res.send(user)
    })
    .catch(
        res.status(400).json({error: "usuario no encontrado"})
    )
}

export const userController = { user_create, user_login, login, listAll, listByUserId};