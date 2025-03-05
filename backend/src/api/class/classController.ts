import { Request, Response, NextFunction } from "express";
import { ServiceResponse } from "../../utils/response";
import { classService } from "./classService";

export const classController = {
     createClassName: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const classname = await classService.createClassName(req.body);
            if (classname instanceof ServiceResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(201).json(ServiceResponse.created(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    getClassName: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const classname = await classService.getClassName(school_id);
            if (classname instanceof ServiceResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(200).json(ServiceResponse.success(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    updateClassName: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedclassname = await classService.updateClassName(req.body);
            if (!updatedclassname) {
                return res.status(404).json({status: false, message: "Class not found"});
            }
            if (updatedclassname instanceof ServiceResponse) {
                return res.status(updatedclassname.statusCode).json(updatedclassname);
            }
            res.status(201).json(ServiceResponse.success(updatedclassname.message, updatedclassname.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    deleteClassName: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const classname = await classService.deleteClassName(Id);
            if (classname instanceof ServiceResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(201).json(ServiceResponse.created(classname.message, classname.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    }
};
