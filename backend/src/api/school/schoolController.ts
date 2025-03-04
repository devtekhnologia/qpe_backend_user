import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../utils/response";
import { SchoolService } from "./schoolService";

export const SchoolController = {
    createSchool: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const school = await SchoolService.createSchool(req.body);
            if (school instanceof ApiResponse) {
                return res.status(school.statusCode).json(school);
            }
            return ApiResponse.created("School Created successfully", school);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

    getSchools: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const id = req.params.id;
            const schools = await SchoolService.getSchools(id);
            if (schools instanceof ApiResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            return ApiResponse.success("Schools Fetched successfully", schools);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

    updateSchool: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedSchool = await SchoolService.updateSchool(req.body);
            if (!updatedSchool) {
                return res.status(404).json({status: false, message: "School not found"});
            }
            if (updatedSchool instanceof ApiResponse) {
                return res.status(updatedSchool.statusCode).json(updatedSchool);
            }
            return ApiResponse.success("School Updated successfully", updatedSchool);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    },

    deleteSchool: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const schoolId = req.params.id;
            const schools = await SchoolService.deleteSchool(schoolId);
            if (schools instanceof ApiResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            return ApiResponse.created("School Deleted successfully", schools);
        } catch (error: any) {
            return ApiResponse.badRequest(error.message);
        }
    }
};
