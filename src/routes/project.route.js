import { Router } from 'express';
import { createProject, getAllProject } from '../controllers/project.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = new Router();

router.post('/create', requireAuth, createProject);
router.get('/all', getAllProject);

export default router;
 