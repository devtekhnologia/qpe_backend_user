// import { Request, Response } from "express";
// import { SchoolService } from "../Services/schoolService";
// import { z } from "zod";

// const createSchoolSchema = z.object({
//     user_id: z.string().min(1, "user_id is required"),
//     name: z.string().min(1, "School name is required"),
//     institute_id: z.string().min(1, "Institute ID is required"),
// });

// const updateSchoolSchema = z.object({
//     _id: z.string().min(1, "School ID is required"),
//     name: z.string().min(1, "School name is required"),
//     institute_id: z.string().min(1, "Institute ID is required"),
//     updated_by: z.string().min(1, "Updated by is required"),
//     user_id: z.string().min(1, "user_id is required"),
// });

// export const SchoolController = {
//     createSchool: async (req: Request, res: Response) => {
//         try {
//             const validatedData = createSchoolSchema.parse(req.body);
//             const school = await SchoolService.createSchool(validatedData);
//             res.status(201).json(school);
//         } catch (error: any) {
//             if (error instanceof z.ZodError) {
//                 return res.status(400).json({ error: error.errors });
//             }
//             res.status(500).json({ error: error.message });
//         }
//     },

//     getSchools: async (req: Request, res: Response) => {
//         try {
//             const instituteId = req.params.id;
//             if (!instituteId) {
//                 return res.status(400).json({ error: "Invalid institute ID" });
//             }
//             const schools = await SchoolService.getSchools(instituteId);
//             res.json(schools);
//         } catch (error: any) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     updateSchool: async (req: Request, res: Response) => {
//         try {
//             const validatedData = updateSchoolSchema.parse(req.body);
//             const updatedSchool = await SchoolService.updateSchool(validatedData);
//             if (!updatedSchool) {
//                 return res.status(404).json({ message: "School not found" });
//             }
//             res.json(updatedSchool);
//         } catch (error: any) {
//             if (error instanceof z.ZodError) {
//                 return res.status(400).json({ error: error.errors });
//             }
//             res.status(500).json({ error: error.message });
//         }
//     },

//     deleteSchool: async (req: Request, res: Response) => {
//         try {
//             const schoolId = req.params.id;
//             if (!schoolId) {
//                 return res.status(400).json({ error: "School ID is required" });
//             }
//             await SchoolService.deleteSchool(schoolId);
//             res.json({ message: "School deleted successfully" });
//         } catch (error: any) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };



import { Request, Response, NextFunction } from "express";
import { SchoolService } from "../Services/schoolService";
import { ApiResponse } from "../Utils/response";

export const SchoolController = {
    createSchool: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const school = await SchoolService.createSchool(req.body);
            if (school instanceof ApiResponse) {
                return res.status(school.statusCode).json(school);
            }
            res.status(201).json(ApiResponse.created("School Created successfully", school));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    getSchools: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const instituteId = req.params.id;
            const schools = await SchoolService.getSchools(instituteId);
            if (schools instanceof ApiResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            res.status(200).json(ApiResponse.success("Schools Fetched successfully", schools));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
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
            res.status(201).json(ApiResponse.success("School Updated successfully", updatedSchool));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    deleteSchool: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const schoolId = req.params.id;
            const schools = await SchoolService.deleteSchool(schoolId);
            if (schools instanceof ApiResponse) {
                return res.status(schools.statusCode).json(schools);
            }
            res.status(201).json(ApiResponse.created("School Deleted successfully", schools));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    }
};
