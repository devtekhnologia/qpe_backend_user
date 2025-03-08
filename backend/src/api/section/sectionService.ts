import { Types } from "mongoose";
import Section, { Data } from "./sectionModel";
import { getEpochTime } from "../../utils/epochTime";

export const sectionService = {

    createSection: async (Data: Partial<Data>) => {
        const existingSection = await Section.findOne({
            name: Data.name,
            reg_idv: Data.reg_id,
        });

        if (existingSection) {
            if (existingSection.status === 0) {
                // If the section exists with status 0, update it to 1
                existingSection.status = 1;
                existingSection.updated_by = new Types.ObjectId(Data.user_id);
                existingSection.updated_at = getEpochTime();
                await existingSection.save();
                return { message: "Existing Section found and updated", result: existingSection };
            } else {
                // If the section exists with status 1, return a message
                return { message: "Section already exists with status 1" };
            }
        }

        // If section doesn't exist, create a new one
        const result = new Section({
            name: Data.name,
            reg_id: Data.reg_id,
            created_by: Data.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });

        await result.save();
        return { message: "Section created successfully", result };
    },

    getSection: async (reg_id: string) => {
        // return await Section.find({ school_id: school_id, status: 1 }).sort({ _id: -1 }); // Filter by institute_id
        const result = await Section.find({ reg_id: reg_id, status: 1 }).sort({ _id: -1 });

        if (result.length > 0) {
            return { message: "Sections retrieved successfully", result };
        } else {
            return { message: "No sections found", result: [] };
        }
    },
    updateSection: async (Data: Partial<Data>) => {
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

        const result = await Section.findByIdAndUpdate(_id, updateData, { new: true });
        return { message: "Section Updated Successfully", result };
    },
    deleteSection: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        const result: any = await Section.findByIdAndUpdate(id, { status: 0 }, { new: true });
        
        if (result) {
            return { message: "Section deleted successfully", result };
        } else {
            return { message: "No section found", result: [] };
        }
    }
}
