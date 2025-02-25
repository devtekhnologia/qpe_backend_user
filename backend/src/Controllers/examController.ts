import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../Utils/response";
import { ExamService } from "../Services/examService";

export const ExamController = {
     createExam: async (req: Request, res: Response, next: NextFunction): Promise<any | void> => {
        try {
            const Exam = await ExamService.createExam(req.body);
            if (Exam instanceof ApiResponse) {
                return res.status(Exam.statusCode).json(Exam);
            }
            res.status(201).json(ApiResponse.created(Exam.message, Exam.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    getExam: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const school_id = req.params.id;
            const Exam = await ExamService.getExam(school_id);
            if (Exam instanceof ApiResponse) {
                return res.status(Exam.statusCode).json(Exam);
            }
            res.status(200).json(ApiResponse.success(Exam.message, Exam.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    updateExam: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const updatedExam = await ExamService.updateExam(req.body);
            if (!updatedExam.result) {
                return res.status(404).json({status: false, message: "Exam not found"});
            }
            if (updatedExam instanceof ApiResponse) {
                return res.status(updatedExam.statusCode).json(updatedExam);
            }
            res.status(201).json(ApiResponse.success(updatedExam.message, updatedExam.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    },

    deleteExam: async (req: Request, res: Response, next: NextFunction): Promise<void | any> => {
        try {
            const Id = req.params.id;
            const Exam = await ExamService.deleteExam(Id);
            if (Exam instanceof ApiResponse) {
                return res.status(Exam.statusCode).json(Exam);
            }
            res.status(201).json(ApiResponse.created(Exam.message, Exam.result));
        } catch (error: any) {
            res.status(400).json(ApiResponse.badRequest(error.message));
        }
    }
};
