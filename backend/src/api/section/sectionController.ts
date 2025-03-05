import { Request, Response, NextFunction } from "express";
import { sectionService } from "./sectionService";
import { ServiceResponse } from "../../utils/response";


export const sectionController = {
    createSection: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const section = await sectionService.createSection(req.body);
            if (section instanceof ServiceResponse) {
                return res.status(section.statusCode).json(section);
            }
            res.status(201).json(ServiceResponse.created(section.message, section.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    getSection: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const schoolId = req.params.id;
            const section = await sectionService.getSection(schoolId);
            if (section instanceof ServiceResponse) {
                return res.status(section.statusCode).json(section);
            }
            res.status(200).json(ServiceResponse.success(section.message, section.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    updateSection: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedSection = await sectionService.updateSection(req.body);
            if (!updatedSection) {
                return res.status(404).json({status: false, message: "Section not found"});
            }
            if (updatedSection instanceof ServiceResponse) {
                return res.status(updatedSection.statusCode).json(updatedSection);
            }
            res.status(201).json(ServiceResponse.success(updatedSection.message, updatedSection.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    },

    deleteSection: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const section = await sectionService.deleteSection(Id);
            if (section instanceof ServiceResponse) {
                return res.status(section.statusCode).json(section);
            }
            res.status(201).json(ServiceResponse.created(section.message, section.result));
        } catch (error: any) {
            res.status(400).json(ServiceResponse.badRequest(error.message));
        }
    }
};
