import User from '../models/user.model.js';

// ==================== CREATE USER =======================//
export async function createUser(data) {
  const user = new User(data);
  return user.save();
}

// ==================== FIND USER BY EMAIL =======================//
export async function findUserByEmail(email) {
  return User.findOne({ email }).exec();
}

// ==================== FIND USER BY EMAIL WITH PASSWORD =======================//
export async function findUserByEmailWithPassword(email) {
  return User.findOne({ email }).select('+password').exec();
}

// ==================== FIND USER BY ID =======================//
export async function findUserById(id) {
  return User.findById(id).exec();
}

// ==================== FIND USER BY ID WITH PASSWORD =======================//
export async function findUserByIdWithPassword(id) {
  return User.findById(id).select('+password').exec();
}

// ==================== UPDATE USER BY ID =======================//
export async function updateUserById(id, updates) {
  const user = await User.findById(id).select('+password');
  if (!user) return null;

  Object.assign(user, updates);
  await user.save();
  return user;
}

// ==================== DELETE USER BY ID =======================//
export async function deleteUserById(id) {
  return User.findByIdAndDelete(id).exec();
}
