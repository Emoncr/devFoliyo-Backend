import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function signToken(payload, opts = {}) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpires, ...opts });
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

export function decodeToken(token) {
  return jwt.decode(token);
}