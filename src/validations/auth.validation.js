import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(1, 'firstName required'),
  lastName: z.string().min(1, 'lastName required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password min 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password min 6 characters'),
});
