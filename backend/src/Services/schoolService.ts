import { ISchool } from "../Interfaces/schoolInterface";
import School from "../Models/schoolModel";
import { getEpochTime } from "../Utils/epochTime";

export const SchoolService = {
    createSchool: async (schoolData: Partial<ISchool> & { user_id: string }) => {
        const school = new School({
            name: schoolData.name,
            institute_id: schoolData.institute_id,
            status: schoolData.status,
            created_by: schoolData.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        return await school.save();
    },

    getSchools: async (instituteId: string) => {
        return await School.find({ institute_id: instituteId }); // Filter by institute_id
    },

    updateSchool: async (schoolData: Partial<ISchool>) => {
        return await School.findByIdAndUpdate(schoolData, { new: true });
    },
    // updateSchool: async (schoolData: Partial<ISchool>) => {
    //     const { _id, ...updateFields } = schoolData;
    //     if (!_id) {
    //         throw new Error("School ID (_id) is required for updating.");
    //     }
    //     return await School.findByIdAndUpdate(_id, updateFields, { new: true });
    // },

    deleteSchool: async (id: string) => {
        return await School.findByIdAndDelete(id);
    }
}