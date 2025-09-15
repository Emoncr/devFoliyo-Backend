import {
  createProjectService,
  getAllProjectService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} from '../services/project.service.js';
import ResponseHandler from '../utils/response.js';

export const createProject = async (req, res, next) => {
  try {
    if (!req.userId && !req.email) return ResponseHandler.unauthorized(res, 'Unauthorized Request');
    let data = req.body;
    data = { ...data, user: req.userId };

    const newProject = await createProjectService(data);

    if (!newProject) {
      return ResponseHandler.error(res, 'Project creating failed', 500);
    }

    return ResponseHandler.created(res, newProject, 'Project created successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const getAllProject = async (req, res, next) => {
  try {
    const projects = await getAllProjectService(req.query);
    return ResponseHandler.success(res, projects, 'Projects fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await getProjectByIdService(req?.params?.id);
    return ResponseHandler.success(res, project, 'Project fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (!req.userId && !req.email) return ResponseHandler.unauthorized(res, 'Unauthorized Request');

    const project = await updateProjectService(req.params.id, req.body);
    return ResponseHandler.success(res, project, 'Project updated successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (!req.userId && !req.email) return ResponseHandler.unauthorized(res, 'Unauthorized Request');
    const project = await deleteProjectService(req.params.id);
    return ResponseHandler.success(res, project, 'Project deleted successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};
