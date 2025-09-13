import Project from '../models/project.Model.js';

export const createProjectService = (data) => {
  const project = new Project(data);
  return project.save();
};

export const getAllProjectService = () => {
  return Project.find().exec();
};
