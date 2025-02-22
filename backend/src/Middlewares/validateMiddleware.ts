import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            // Format the errors to include "status: false"
            const formattedErrors = result.error.flatten().fieldErrors;
            return res.status(400).json({
                status: false,
                message: "Validation failed",
                errors: formattedErrors,
            });
        }
        next();
    };
};
