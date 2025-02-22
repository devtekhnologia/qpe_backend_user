import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../Utils/response";
import { classService } from "../Services/classService";

export const classController = {
    createClassName: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const classname = await classService.createClassName(req.body);
            if (classname instanceof ApiResponse) {
                return res.status(classname.statusCode).json(classname);
            }
            res.status(201).json(ApiResponse.created("School Created successfully", classname));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    getClassName: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const instituteId = req.params.id;
            const schools = await classService.getClassName(instituteId);
            if (schools instanceof ApiResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            res.status(200).json(ApiResponse.success("Schools Fetched successfully", schools));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    updateClassName: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedSchool = await classService.updateClassName(req.body);
            if (!updatedSchool) {
                return res.status(404).json({status: false, message: "School not found"});
            }
            if (updatedSchool instanceof ApiResponse) {
                return res.status(updatedSchool.statusCode).json(updatedSchool);
            }
            res.status(201).json(ApiResponse.success("School Updated successfully", updatedSchool));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    deleteClassName: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const schoolId = req.params.id;
            const schools = await classService.deleteClassName(schoolId);
            if (schools instanceof ApiResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            res.status(201).json(ApiResponse.created("School Deleted successfully", schools));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    }
};
