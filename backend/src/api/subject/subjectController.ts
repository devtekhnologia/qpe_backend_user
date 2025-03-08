import { Request, Response, NextFunction } from "express";
import { subjectService } from "./subjectService";
import { ServiceResponse } from "../../utils/response";


export const subjectController = {
     create: async (req: Request): Promise<ServiceResponse> => {
        try {
            const Subject = await subjectService.createSubject(req.body);
            return ServiceResponse.created(Subject.message, Subject.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    fetch: async (req: Request): Promise<ServiceResponse> => {
        try {
            const reg_id = req.params.id;
            const Subject = await subjectService.getSubject(reg_id);
            return ServiceResponse.success(Subject.message, Subject.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    update: async (req: Request): Promise<ServiceResponse> => {
        try {
            const updatedSubject = await subjectService.updateSubject(req.body);
            return ServiceResponse.success(updatedSubject.message, updatedSubject.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    delete: async (req: Request): Promise<ServiceResponse> => {
        try {
            const Id = req.params.id;
            const Subject = await subjectService.deleteSubject(Id);
            return ServiceResponse.success(Subject.message, Subject.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    }
};
