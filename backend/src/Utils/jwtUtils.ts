// src/utils/jwtUtils.ts
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'tekhnologia@9999';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw error;
  }
}
