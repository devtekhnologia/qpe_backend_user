import { Request, Response, NextFunction } from "express";
import { ServiceResponse } from "../../utils/response";
import { SchoolService } from "./schoolService";

export const SchoolController = {
    createSchool: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const school = await SchoolService.createSchool(req.body);
            if (school instanceof ServiceResponse) {
                return res.status(school.statusCode).json(school);
            }
            res.status(201).json(ServiceResponse.created("School Created successfully", school));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    getSchools: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const id = req.params.id;
            const schools = await SchoolService.getSchools(id);
            if (schools instanceof ServiceResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            res.status(200).json(ServiceResponse.success("Schools Fetched successfully", schools));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    updateSchool: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedSchool = await SchoolService.updateSchool(req.body);
            if (!updatedSchool) {
                return res.status(404).json({status: false, message: "School not found"});
            }
            if (updatedSchool instanceof ServiceResponse) {
                return res.status(updatedSchool.statusCode).json(updatedSchool);
            }
            res.status(201).json(ServiceResponse.success("School Updated successfully", updatedSchool));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    deleteSchool: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const schoolId = req.params.id;
            const schools = await SchoolService.deleteSchool(schoolId);
            if (schools instanceof ServiceResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            res.status(201).json(ServiceResponse.created("School Deleted successfully", schools));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    }
};
