import { Request, Response, NextFunction } from "express";
import { subjectService } from "./subjectService";
import { ServiceResponse } from "../../utils/response";


export const subjectController = {
     createSubject: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const Subject = await subjectService.createSubject(req.body);
            if (Subject instanceof ServiceResponse) {
                return res.status(Subject.statusCode).json(Subject);
            }
            res.status(201).json(ServiceResponse.created(Subject.message, Subject.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    getSubject: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const Subject = await subjectService.getSubject(school_id);
            if (Subject instanceof ServiceResponse) {
                return res.status(Subject.statusCode).json(Subject);
            }
            res.status(200).json(ServiceResponse.success(Subject.message, Subject.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    updateSubject: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedSubject = await subjectService.updateSubject(req.body);
            if (!updatedSubject) {
                return res.status(404).json({status: false, message: "Class not found"});
            }
            if (updatedSubject instanceof ServiceResponse) {
                return res.status(updatedSubject.statusCode).json(updatedSubject);
            }
            res.status(201).json(ServiceResponse.success(updatedSubject.message, updatedSubject.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    deleteSubject: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const Subject = await subjectService.deleteSubject(Id);
            if (Subject instanceof ServiceResponse) {
                return res.status(Subject.statusCode).json(Subject);
            }
            res.status(201).json(ServiceResponse.created(Subject.message, Subject.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    }
};
