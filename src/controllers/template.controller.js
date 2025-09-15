import {
  createTemplateService,
  getAllTemplateService,
  getTemplateByIdService,
  updateTemplateService,
  deleteTemplateService,
} from '../services/template.service.js';
import ResponseHandler from '../utils/response.js';

// CREATE TEMPLATE
export const createTemplate = async (req, res, next) => {
  try {
    const template = await createTemplateService(req.body);
    return ResponseHandler.created(res, template, 'Template created successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

// GET ALL TEMPLATES
export const getAllTemplates = async (req, res, next) => {
  try {
    const templates = await getAllTemplateService(req.query);
    return ResponseHandler.success(res, templates, 'Templates fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

// GET TEMPLATE BY ID
export const getTemplateById = async (req, res, next) => {
  try {
    const template = await getTemplateByIdService(req.params.id);
    return ResponseHandler.success(res, template, 'Template fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

// UPDATE TEMPLATE
export const updateTemplate = async (req, res, next) => {
  try {
    const template = await updateTemplateService(req.params.id, req.body);
    return ResponseHandler.success(res, template, 'Template updated successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

// DELETE TEMPLATE
export const deleteTemplate = async (req, res, next) => {
  try {
    const template = await deleteTemplateService(req.params.id);
    return ResponseHandler.success(res, template, 'Template deleted successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};
