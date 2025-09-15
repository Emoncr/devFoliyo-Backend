import Template from '../models/template.model.js';

// CREATE TEMPLATE
export const createTemplateService = async (data) => {
  const template = new Template(data);
  return template.save();
};

// GET ALL TEMPLATES WITH PAGINATION, SEARCH, SORT, FILTER
export const getAllTemplateService = async (query = {}) => {
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

  const searchCondition = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } },
          { longDescription: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const finalQuery = { ...filters, ...searchCondition };
  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const [templates, total] = await Promise.all([
    Template.find(finalQuery)
      .sort(sortOptions)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .exec(),
    Template.countDocuments(finalQuery),
  ]);

  return {
    items: templates,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

// GET TEMPLATE BY ID
export const getTemplateByIdService = async (id) => {
  return Template.findById(id).exec();
};

// UPDATE TEMPLATE BY ID
export const updateTemplateService = async (id, updateData) => {
  return Template.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

// DELETE TEMPLATE BY ID
export const deleteTemplateService = async (id) => {
  return Template.findByIdAndDelete(id).exec();
};
