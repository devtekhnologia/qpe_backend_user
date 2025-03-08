import { Request, Response, NextFunction } from "express";
import { ServiceResponse } from "../../utils/response";
import { classService } from "./classService";

export const classController = {
     create: async (req: Request): Promise<ServiceResponse> => {
        try {
            const classname = await classService.createClassName(req.body);
            return ServiceResponse.created(classname.message, classname.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    fetch: async (req: Request): Promise<ServiceResponse> => {
        try {
            const reg_id = req.params.id;
            const classname = await classService.getClassName(reg_id);
            return ServiceResponse.success(classname.message, classname.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    update: async (req: Request): Promise<ServiceResponse> => {
        try {
            const updatedclassname = await classService.updateClassName(req.body);
            return ServiceResponse.success(updatedclassname.message, updatedclassname.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

    delete: async (req: Request): Promise<ServiceResponse> => {
        try {
            const Id = req.params.id;
            const classname = await classService.deleteClassName(Id);
            return ServiceResponse.created(classname.message, classname.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    }
};
