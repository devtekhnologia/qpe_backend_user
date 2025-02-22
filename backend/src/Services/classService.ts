import { AClassname, UClassname } from "../Interfaces/classInterface";
import Class from "../Models/classModel";
import { getEpochTime } from "../Utils/epochTime";

export const classService = {
    createClassName: async (Data: Partial<AClassname> & { user_id: string }) => {
        const classname = new Class({
            name: Data.name,
            school_id: Data.school_id,
            status: 1,
            created_by: Data.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        return await classname.save();
    },

    getClassName: async (instituteId: string) => {
        return await Class.find({ institute_id: instituteId, status: 1 }).sort({ _id: -1 }); // Filter by institute_id
    },

    updateClassName: async (schoolData: Partial<UClassname>) => {
        const _id = (schoolData as { _id?: string })._id; // Explicit assertion
        if (!_id) {
            throw new Error("School ID (_id) is required for updating.");
        }

        // Ensure updated_by is set to user_id
        const updateData = {
            ...schoolData,
            status: 1,
            updated_by: schoolData.user_id, // Set updated_by from user_id
            updated_at: getEpochTime(),
        };

        return await Class.findByIdAndUpdate(_id, updateData, { new: true });
    },


    deleteClassName: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        return await Class.findByIdAndUpdate(id, { status: 0 }, { new: true });
    }
}