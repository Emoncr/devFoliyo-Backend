import * as userService from '../services/user.service.js';

// GET /api/users
export async function getUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

// GET /api/users/:id
export async function getUser(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// PUT /api/users/:id
export async function updateUser(req, res, next) {
  try {
    const updates = req.body; // validated by Zod or any middleware
    const updated = await userService.updateUser(req.params.id, updates);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'Email already in use' });
    next(err);
  }
}

// DELETE /api/users/:id
export async function deleteUser(req, res, next) {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
