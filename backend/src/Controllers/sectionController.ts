import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../Utils/response";
import { sectionService } from "../Services/sectionService";

export const sectionController = {
     createSection: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const classname = await sectionService.createSection(req.body);
            // if (classname instanceof ApiResponse) {
            //     return res.status(classname.statusCode).json(classname);
            // }
            res.status(201).json(ApiResponse.created("School Created successfully", classname));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
};
