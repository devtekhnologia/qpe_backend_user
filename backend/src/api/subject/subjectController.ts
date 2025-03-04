import { Request, Response, NextFunction } from "express";
import { subjectService } from "./subjectService";
import { ApiResponse } from "../../utils/response";


export const subjectController = {
     createSubject: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const Subject = await subjectService.createSubject(req.body);
            if (Subject instanceof ApiResponse) {
                return res.status(Subject.statusCode).json(Subject);
            }
            return ApiResponse.created(Subject.message, Subject.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

    getSubject: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const Subject = await subjectService.getSubject(school_id);
            if (Subject instanceof ApiResponse) {
                return res.status(Subject.statusCode).json(Subject);
            }
            return ApiResponse.success(Subject.message, Subject.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

    updateSubject: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedSubject = await subjectService.updateSubject(req.body);
            if (!updatedSubject) {
                return res.status(404).json({status: false, message: "Class not found"});
            }
            if (updatedSubject instanceof ApiResponse) {
                return res.status(updatedSubject.statusCode).json(updatedSubject);
            }
            return ApiResponse.success(updatedSubject.message, updatedSubject.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

    deleteSubject: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const Subject = await subjectService.deleteSubject(Id);
            if (Subject instanceof ApiResponse) {
                return res.status(Subject.statusCode).json(Subject);
            }
            return ApiResponse.created(Subject.message, Subject.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    }
};
