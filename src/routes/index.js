import { Router } from 'express';
import authRoutes from './auth.route.js';
import userRoutes from './user.route.js';
import projectRoutes from './project.route.js';
import templateRoutes from './template.route.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/project', projectRoutes);
router.use('/template', templateRoutes);

export default router;
