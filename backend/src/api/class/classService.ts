import { Types } from "mongoose";
import Class, { Data } from "./classModel"; 
import { getEpochTime } from "../../utils/epochTime";

export const classService = {
    createClassName: async (Data: Partial<Data>) => {

        const existing = await Class.findOne({
            name: Data.name,
            school_id: Data.school_id,
        });

        if (existing) {
            if (existing.status === 0) {
                // If the Classname exists with status 0, update it to 1
                existing.status = 1;
                existing.updated_by = new Types.ObjectId(Data.user_id);
                existing.updated_at = getEpochTime();
                await existing.save();
                return { message: "Existing Classname found and updated", result: existing };
            } else {
                // If the Classname exists with status 1, return a message
                return { message: "Classname already exists with status 1" };
            }
        }

        const result = new Class({
            name: Data.name,
            school_id: Data.school_id,
            created_by: Data.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        await result.save();
        return { message: "Classname created successfully", result };
    },

    getClassName: async (school_id: string) => {
        const result = await Class.find({ school_id: school_id, status: 1 }).sort({ _id: -1 }); // Filter by institute_id

        if (result.length > 0) {
            return { message: "Classname retrieved successfully", result };
        } else {
            return { message: "No Classname found", result: [] };
        }
    },

    updateClassName: async (Data: Partial<Data>) => {
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

        const result = await Class.findByIdAndUpdate(_id, updateData, { new: true });
        return { message: "Classname Updated Successfully", result };
    },


    deleteClassName: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        const result = await Class.findByIdAndUpdate(id, { status: 0 }, { new: true });

        if (result) {
            return { message: "Classname deleted successfully", result };
        } else {
            return { message: "No Classname found", result: [] };
        }
    }
}