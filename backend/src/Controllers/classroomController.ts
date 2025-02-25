import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../Utils/response";
import { classroomService } from "../Services/classroomService";

export const classroomController = {
    createClassroom: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classroomService.createclassroom(req.body);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(201).json(ApiResponse.created(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    getClassroom: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const classname = await classroomService.getClassroom(school_id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(200).json(ApiResponse.success(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    updateclassroom: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classroomService.updateclassroom(req.body);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(200).json(ApiResponse.success(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    deleteClassroom: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const classname = await classroomService.deleteClassroom(Id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(201).json(ApiResponse.created(classname.message, classname.result));
        } catch (error: any) {  
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    getClassroomSubjects: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const classroom_id = req.params.id;
            const classname = await classroomService.getClassroomSubjects(classroom_id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(200).json(ApiResponse.success(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

};
