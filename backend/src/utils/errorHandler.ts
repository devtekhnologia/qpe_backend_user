// export const errorHandler = (statusCode: number, message: string): Error & { statusCode: number } => {
//     const error = new Error(message) as Error & { statusCode: number };
//     error.statusCode = statusCode;
//     return error;
// };
import { Request, Response, NextFunction } from "express";

// ✅ Custom error handler function
export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";

  // Handle 404 errors
  if (err.status === 404) {
    err.message = `❌ Route ${req.originalUrl} not found`;
  }

  console.error(`❌ Error [${err.status}]:`, err.stack || err.message);

  res.status(err.status).json({
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Hide stack trace in production
  });
};
