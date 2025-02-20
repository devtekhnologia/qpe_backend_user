// src/utils/jwtUtils.ts
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'tekhnologia@9999';

export function generateToken(
  user: { 
    user_id: number, 
    name: string,
    user_name: string,
    user_email: string,
    contact_no: string,
    date_of_birth: Date,
    user_photo: string,
    user_type: number, 
    institute_id: number
    school_id: number
  }
): string {
  const payload = { 
    user_id: user.user_id, 
    name: user.name, 
    user_name: user.user_name, 
    user_email: user.user_email,
    contact_no: user.contact_no,
    date_of_birth: user.date_of_birth,
    user_photo: user.user_photo || 'Uploads/user_default.png',
    role_id: user.user_type,
    institute_id: user.institute_id,
    school_id: user.school_id  
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: process.env.JWT_EXPIRATION || '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}
