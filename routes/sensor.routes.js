import { Router } from 'express';

import { sensorController } from '../controllers/sensores.controller.js';

const router = Router();

router.get('/listAll', (req, res) => sensorController.listAll(req, res));
router.post('/create', (req, res) => sensorController.sensor_create(req, res));
router.get('/getLatest/:dispositivo_id', (req, res) => sensorController.getLatest(req, res));//pnitar esto en la tabls
//aun se va hacer la actuailizacon 
export default router;