import Router from 'express';
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
} from '../controllers/template.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = new Router();

router.post('/create', requireAuth, createTemplate);
router.get('/all', getAllTemplates);
router.get('/details/:id', getTemplateById);
router.delete('/delete/:id', requireAuth, deleteTemplate);
router.put('/update/:id', requireAuth, updateTemplate);

export default router;
