import * as userService from '../services/user.service.js';
import { signToken } from '../utils/jwt.js';
import ResponseHandler from '../utils/response.js';

export async function signup(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await userService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const user = await userService.createUser({ firstName, lastName, email, password });
    const token = signToken({ sub: user._id.toString(), email: user.email });

    return res.status(201).json({ user: user.toJSON(), token });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Get user with password field included
    const userWithPassword = await userService.findUserByEmailWithPassword(email);

    if (!userWithPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await userWithPassword.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({
      sub: userWithPassword._id.toString(),
      email: userWithPassword.email,
    });

    // Remove password from response
    const userResponse = userWithPassword.toJSON();
    delete userResponse.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return ResponseHandler.created(res, { user: userResponse, token }, 'Login successful');
  } catch (err) {
    next(err);
  }
}
