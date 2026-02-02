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

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /project/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - shortDescription
 *               - longDescription
 *               - tags
 *               - coverImage
 *               - sampleImages
 *               - projectDate
 *               - techStack
 *               - isFeatured
 *               - isHighlighted
 *               - categories
 *               - projectType
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               longDescription:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               coverImage:
 *                 type: string
 *               sampleImages:
 *                 type: array
 *                 items:
 *                   type: string
 *               previewLink:
 *                 type: string
 *               projectDate:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: object
 *               isFeatured:
 *                 type: boolean
 *               isHighlighted:
 *                 type: boolean
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               projectType:
 *                 type: string
 *               githubLink:
 *                 type: string
 *               client:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/create', requireAuth, createProject);

/**
 * @swagger
 * /project/all:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/all', getAllProject);

/**
 * @swagger
 * /project/details/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/details/:id', getProjectById);

/**
 * @swagger
 * /project/delete/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', requireAuth, deleteProject);

/**
 * @swagger
 * /project/update/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               longDescription:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               coverImage:
 *                 type: string
 *               sampleImages:
 *                 type: array
 *                 items:
 *                   type: string
 *               previewLink:
 *                 type: string
 *               projectDate:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: object
 *               isFeatured:
 *                 type: boolean
 *               isHighlighted:
 *                 type: boolean
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               projectType:
 *                 type: string
 *               githubLink:
 *                 type: string
 *               client:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id', requireAuth, updateProject);

export default router;
