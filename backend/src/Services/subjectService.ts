import { Data } from "../interfaces/commonInterface";
import Subject from "../models/subjectModel";
import { Types } from "mongoose";
import { getEpochTime } from "../Utils/epochTime";

export const subjectService = {
    createSubject: async (Data: Partial<Data>) => {

        const existing = await Subject.findOne({
            name: Data.name,
            school_id: Data.school_id,
        });

        if (existing) {
            if (existing.status === 0) {
                // If the Subject exists with status 0, update it to 1
                existing.status = 1;
                existing.updated_by = new Types.ObjectId(Data.user_id);
                existing.updated_at = getEpochTime();
                await existing.save();
                return { message: "Existing Subject found and updated", result: existing };
            } else {
                // If the Subject exists with status 1, return a message
                return { message: "Subject already exists with status 1" };
            }
        }

        const result = new Subject({
            name: Data.name,
            school_id: Data.school_id,
            created_by: Data.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        await result.save();
        return { message: "Subject created successfully", result };
    },

    getSubject: async (school_id: string) => {
        const result = await Subject.find({ school_id: school_id, status: 1 }).sort({ _id: -1 }); // Filter by institute_id

        if (result.length > 0) {
            return { message: "Subject retrieved successfully", result };
        } else {
            return { message: "No Subject found", result: [] };
        }
    },

    updateSubject: async (Data: Partial<Data>) => {
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

        const result = await Subject.findByIdAndUpdate(_id, updateData, { new: true });
        return { message: "Subject Updated Successfully", result };
    },


    deleteSubject: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        const result = await Subject.findByIdAndUpdate(id, { status: 0 }, { new: true });

        if (result) {
            return { message: "Subject deleted successfully", result };
        } else {
            return { message: "No Subject found", result: [] };
        }
    }
}