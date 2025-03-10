// src/utils/jwtUtils.ts
import jwt from 'jsonwebtoken';

// JWT Secret Keys (Should be stored in environment variables)
const jwtSecret = process.env.JWT_SECRET || 'tekhnologia@9999';
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_token_secret";

interface Token {
  user_id?: String;
  role_id?: String;
  role_name?: String;
  reg_id?: String;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw error;
  }
}

export const generateAccessToken = (payload: Token) => {
  return jwt.sign(
    {
      user_id: payload.user_id,
      role_id: payload.role_id,
      role_name: payload.role_name,
      reg_id: payload.reg_id
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
    }
  );
};

export const generateRefreshToken = (payload: Token) => {
  return jwt.sign(
    {
      user_id: payload.user_id,
      role_id: payload.role_id,
      role_name: payload.role_name,
      reg_id: payload.reg_id
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
    }
  );
};