import { Router } from 'express';

import { userController } from '../controllers/user.controller.js';

const router = Router();

router.post('/create', (req, res) => userController.user_create(req, res));

router.post('/login', (req, res) => userController.user_login(req, res));

export default router;

