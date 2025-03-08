import { Request, Response, NextFunction } from "express";
import { sectionService } from "./sectionService";
import { ServiceResponse } from "../../utils/response";


export const sectionController = {
    create: async (req: Request): Promise<ServiceResponse> => {
        try {
            const section = await sectionService.createSection(req.body);
            return ServiceResponse.created(section.message, section.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    fetch: async (req: Request): Promise<ServiceResponse> => {
        try {
            const regId = req.params.id;
            const section = await sectionService.getSection(regId);
            return ServiceResponse.success(section.message, section.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    update: async (req: Request): Promise<ServiceResponse> => {
        try {
            const updatedSection = await sectionService.updateSection(req.body);
            return ServiceResponse.success(updatedSection.message, updatedSection.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    delete: async (req: Request): Promise<ServiceResponse> => {
        try {
            const Id = req.params.id;
            const section = await sectionService.deleteSection(Id);
            return ServiceResponse.created(section.message, section.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    }
};
