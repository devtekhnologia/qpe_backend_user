import { Request, Response, NextFunction } from "express";
import { classroomService } from "./classroomService";
import { ServiceResponse } from "../../utils/response";


export const classroomController = {
    createClassroom: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classroomService.createclassroom(req.body);
            if (result instanceof ServiceResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(201).json(ServiceResponse.created(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },
    getClassroom: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const classname = await classroomService.getClassroom(school_id);
            if (classname instanceof ServiceResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(200).json(ServiceResponse.success(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },
    updateclassroom: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classroomService.updateclassroom(req.body);
            if (result instanceof ServiceResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(200).json(ServiceResponse.success(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },
    deleteClassroom: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const classname = await classroomService.deleteClassroom(Id);
            if (classname instanceof ServiceResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(201).json(ServiceResponse.created(classname.message, classname.result));
        } catch (error: any) {  
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },
    getClassroomSubjects: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const classroom_id = req.params.id;
            const classname = await classroomService.getClassroomSubjects(classroom_id);
            if (classname instanceof ServiceResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(200).json(ServiceResponse.success(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

};
