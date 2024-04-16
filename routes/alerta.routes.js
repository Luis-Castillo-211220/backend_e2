import { Router } from 'express';

import { alertaController } from '../controllers/alertas.controller.js';

const router = Router();

router.post('/create', (req, res) => alertaController.alerta_create(req, res));
router.get('/listAll', (req, res) => alertaController.alert_listAll(req, res));
router.get('/listByAlertId', (req, res) => alertaController.listByAlertID(req, res));
router.get('/listByDispId', (req, res) => alertaController.listByDispID(req, res))

export default router;