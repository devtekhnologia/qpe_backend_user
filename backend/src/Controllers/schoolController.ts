import { Request, Response } from "express";
import { SchoolService } from "../Services/schoolService";


export const SchoolController = {
    createSchool: async(req: Request, res: Response) => {
        try {
            if (!req.body.user_id) {
                return res.status(400).json({ error: "user_id is required" });
            }
            const school = await SchoolService.createSchool(req.body);
            res.status(201).json(school);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getSchools: async (req: Request, res: Response) => {
        try {
            const instituteId = req.params.id; // Convert id to a number
            if (!instituteId) {
                return res.status(400).json({ error: "Invalid institute ID" });
            }
            const schools = await SchoolService.getSchools(instituteId);
            res.json(schools);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    updateSchool: async (req: Request, res: Response) => {
        try {
            const updatedSchool = await SchoolService.updateSchool(req.body);
            if (!updatedSchool) {
                return res.status(404).json({ message: "School not found" });
            }
            res.json(updatedSchool);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteSchool: async (req: Request, res: Response) => {
        try {
            await SchoolService.deleteSchool(req.params.id);
            res.json({ message: "School deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}