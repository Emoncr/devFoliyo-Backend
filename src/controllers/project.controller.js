import { createProjectService, getAllProjectService } from '../services/project.service.js';
import ResponseHandler from '../utils/response.js';

export const createProject = async (req, res, next) => {
  try {
    console.log(req.userId, req.email);

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

export const getAllProject = async(req, res, next) => {
  try {
    const projects = await getAllProjectService();
    return ResponseHandler.success(res, projects, 'Projects fetched successfully');
  } catch (err) {
    return ResponseHandler.error(res, err.message);
  }
};
