import { ASection } from "../Interfaces/sectionInterface";
import Section from "../Models/sectionModel";
import { getEpochTime } from "../Utils/epochTime";

export const sectionService = {
    createSection: async (Data: Partial<ASection> & { user_id: string }) => {
        const section = new Section({
            name: Data.name,
            school_id: Data.school_id,
            status: 1,
            created_by: Data.user_id, // Mapping user_id to created_by
            created_at: getEpochTime(), // Setting created_at as epoch time
        });
        return await section.save();
    },
}