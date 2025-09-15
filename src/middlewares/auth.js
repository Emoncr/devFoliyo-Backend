import { verifyToken } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized Request' });

    const token = auth.split(' ')[1];
    const payload = verifyToken(token);
    req.userId = payload.sub; // we sign token with { sub: userId }
    req.email = payload.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
