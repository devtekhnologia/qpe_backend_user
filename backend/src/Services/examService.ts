import { Data } from "../interfaces/commonInterface";
import Exam from "../models/examModel";
import { Types } from "mongoose";
import { getEpochTime } from "../Utils/epochTime";

export const ExamService = {
    createExam: async (Data: Partial<Data>) => {

        const existing = await Exam.findOne({
            name: Data.name,
            school_id: Data.school_id,
        });

        if (existing) {
            if (existing.status === 0) {
                // If the Exam exists with status 0, update it to 1
                existing.status = 1;
                existing.updated_by = new Types.ObjectId(Data.user_id);
                existing.updated_at = getEpochTime();
                await existing.save();
                return { message: "Existing Exam found and updated", result: existing };
            } else {
                // If the Exam exists with status 1, return a message
                return { message: "Exam already exists with status 1" };
            }
        }

        const result = new Exam({
            name: Data.name,
            school_id: Data.school_id,
            created_by: Data.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        await result.save();
        return { message: "Exam created successfully", result };
    },

    getExam: async (school_id: string) => {
        const result = await Exam.find({ school_id: school_id, status: 1 }).sort({ _id: -1 }); // Filter by institute_id

        if (result.length > 0) {
            return { message: "Exam retrieved successfully", result };
        } else {
            return { message: "No Exam found", result: [] };
        }
    },

    updateExam: async (Data: Partial<Data>) => {
        const _id = (Data as { id?: string }).id; // Explicit assertion
        if (!_id) {
            throw new Error("ID (_id) is required for updating.");
        }

        // Ensure updated_by is set to user_id
        const updateData = {
            ...Data,
            updated_by: Data.user_id, // Set updated_by from user_id
            updated_at: getEpochTime(),
        };

        const result = await Exam.findByIdAndUpdate(_id, updateData, { new: true });
        return { message: "Exam Updated Successfully", result };
    },


    deleteExam: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        const result = await Exam.findByIdAndUpdate(id, { status: 0 }, { new: true });

        if (result) {
            return { message: "Exam deleted successfully", result };
        } else {
            return { message: "No Exam found", result: [] };
        }
    }
}