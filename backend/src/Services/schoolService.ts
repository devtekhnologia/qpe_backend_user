import { ASchool, USchool } from "../Interfaces/schoolInterface";
import School from "../Models/schoolModel";
import { getEpochTime } from "../Utils/epochTime";

export const SchoolService = {
    createSchool: async (schoolData: Partial<ASchool> & { user_id: string }) => {
        const school = new School({
            name: schoolData.name,
            status: 1,
            created_by: schoolData.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        return await school.save();
    },

    getSchools: async (instituteId: string) => {
        return await School.find({ institute_id: instituteId, status: 1 }).sort({ _id: -1 }); // Filter by institute_id
    },

    updateSchool: async (schoolData: Partial<USchool>) => {
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

        return await School.findByIdAndUpdate(_id, updateData, { new: true });
    },


    deleteSchool: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        return await School.findByIdAndUpdate(id, { status: 0 }, { new: true });
    }
}