import { Router } from 'express';

import { dispositivoController } from '../controllers/dispositivos.controller.js';

const router = Router();

router.post('/create', (req, res) => dispositivoController.disp_create(req, res));
router.get('/listByUserId/:usuario_id', (req, res) => dispositivoController.disp_list(req, res));
router.get('/listAll', (req, res) => dispositivoController.disp_listAll(req, res));
router.post('/diposCreate', (req, res) => dispositivoController.dispositivo_create(req, res))

export default router;

