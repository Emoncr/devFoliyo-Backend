import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getAllProject,
  getProjectById,
  updateProject,
} from '../controllers/project.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = new Router();

router.post('/create', requireAuth, createProject);
router.get('/all', getAllProject);
router.get('/details/:id', getProjectById);
router.delete('/delete/:id', requireAuth, deleteProject);
router.put('/update/:id', requireAuth, updateProject);

export default router;
