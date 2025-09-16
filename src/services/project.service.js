import Project from '../models/project.model.js';


export const createProjectService = (data) => {
  const project = new Project(data);
  return project.save();
};

// Get all projects with pagination, search, sort, filter
export const getAllProjectService = async (query = {}) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    ...filters
  } = query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  // Build search conditions
  const searchCondition = search
    ? {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  // Build final filter + search
  const finalQuery = { ...filters, ...searchCondition };

  // Build sort
  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // Fetch data
  const [projects, total] = await Promise.all([
    Project.find(finalQuery)
      .sort(sortOptions)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .exec(),
    Project.countDocuments(finalQuery),
  ]);

  return {
    items: projects,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

// Get project by ID
export const getProjectByIdService = async (id) => {
  return Project.findById(id).exec();
};

// Update project by ID
export const updateProjectService = async (id, updateData) => {
  return Project.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

// Delete project by ID
export const deleteProjectService = async (id) => {
  return Project.findByIdAndDelete(id).exec();
};
