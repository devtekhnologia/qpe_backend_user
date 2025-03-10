import { Request, Response, NextFunction } from "express";
import { classroomService } from "./classroomService";
import { ServiceResponse } from "../../utils/response";


export const classroomController = {
    create: async (req: Request): Promise<ServiceResponse> => {
        try {
            const result = await classroomService.createclassroom(req.body);
            return ServiceResponse.created(result.message, result.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },
    fetch: async (req: Request): Promise<ServiceResponse> => {
        try {
            const reg_id = req.params.id;
            const classname = await classroomService.getClassroom(reg_id);
            return ServiceResponse.success(classname.message, classname.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },
    update: async (req: Request): Promise<ServiceResponse> => {
        try {
            const result = await classroomService.updateclassroom(req.body);
            return ServiceResponse.success(result.message, result.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },
    delete: async (req: Request): Promise<ServiceResponse> => {
        try {
            const Id = req.params.id;
            const classname = await classroomService.deleteClassroom(Id);
            return ServiceResponse.created(classname.message, classname.result);
        } catch (error: any) {  
            return ServiceResponse.badRequest(error.message);
        }
    },
    getClassroomSubjects: async (req: Request): Promise<ServiceResponse> => {
        try {
            const classroom_id = req.params.id;
            const classname = await classroomService.getClassroomSubjects(classroom_id);
            return ServiceResponse.success(classname.message, classname.result);
        } catch (error: any) {
            return ServiceResponse.badRequest(error.message);
        }
    },

};
