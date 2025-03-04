import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export interface CustomRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

// Define schema structure
interface ValidationSchema {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
  files?: ZodSchema;
}

export const validateRequest = (schema: ValidationSchema): any => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      // ✅ Validate body, query, params, and files if schema exists
      if (schema.body) schema.body.parse(req.body);
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      if (schema.files && (req.file || req.files)) {
        schema.files.parse(req.files ?? req.file);
      }

      next(); // Proceed to next middleware
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: false,
          message: "Validation failed",
          errors: err.flatten().fieldErrors, // Returns structured error messages
        });
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong",
      });
    }
  };
};

