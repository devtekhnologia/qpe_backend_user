import { Request, Response, NextFunction } from "express";
import { classroomService } from "./classroomService";
import { ApiResponse } from "../../utils/response";


export const classroomController = {
    createClassroom: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classroomService.createclassroom(req.body);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            return ApiResponse.created(result.message, result.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },
    getClassroom: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const classname = await classroomService.getClassroom(school_id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            return ApiResponse.success(classname.message, classname.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },
    updateclassroom: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classroomService.updateclassroom(req.body);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            return ApiResponse.success(result.message, result.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },
    deleteClassroom: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const classname = await classroomService.deleteClassroom(Id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            return ApiResponse.created(classname.message, classname.result);
        } catch (error: any) {  
            return ApiResponse.badRequest(error.message);
        }
    },
    getClassroomSubjects: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const classroom_id = req.params.id;
            const classname = await classroomService.getClassroomSubjects(classroom_id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            return ApiResponse.success(classname.message, classname.result);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

};
