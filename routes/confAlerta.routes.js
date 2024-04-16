import { Router } from "express";

import { confAlertasController } from "../controllers/confAlertas.controller.js";

const router = Router();

router.post('/create', (req, res) => confAlertasController.conf_create(req, res));
router.get('/listAll', (req, res) => confAlertasController.listAll(req, res));
router.get('/getByDispId/:dispositivo_id', (req, res) => confAlertasController.getConfByDispId(req, res));
router.put('/updateById/:conf_alerta_id', (req, res) => confAlertasController.updateConfAlerta(req, res));

export default router;