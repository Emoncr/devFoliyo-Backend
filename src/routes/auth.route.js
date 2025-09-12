import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller.js';
const router = Router();
router.post('/signup', signup);
router.post('/signin', login);
export default router;
