import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../Utils/response";
import { classExamService } from "../Services/classExamService";

export const classExamController = {
    createClassExam: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classExamService.createClassExam(req.body);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(201).json(ApiResponse.created(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    getClassExam: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const result = await classExamService.getClassExam(school_id);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(200).json(ApiResponse.success(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    updateClassexam: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const result = await classExamService.updateClassexam(req.body);
            if (result instanceof ApiResponse) {
                return res.status(result.statusCode).json(result);
            }
            res.status(200).json(ApiResponse.success(result.message, result.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },
    deleteClassExam: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const classname = await classExamService.deleteClassExam(Id);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(201).json(ApiResponse.created(classname.message, classname.result));
        } catch (error: any) {  
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

};
