import { Types } from "mongoose";
import { getEpochTime } from "../Utils/epochTime";
import Classroom from "../Models/classroomModel";
import { Data } from "../Interfaces/classroomInterface";
import Class from "../Models/classModel";
import Section from "../Models/sectionModel";
import Subject from "../Models/subjectModel";

export const classroomService = {

    createclassroom: async (Data: Partial<Data>) => {
        if (!Data.subject_ids || Data.subject_ids.length === 0) {
            throw new Error("subject_ids is required and must contain at least one subject.");
        }

        // Convert new subject_ids to ObjectId[]
        const newSubjectIds = Data.subject_ids.map(id => new Types.ObjectId(id));

        // Check if the classroom already exists
        const existing = await Classroom.findOne({
            class_id: Data.class_id,
            section_id: Data.section_id,
            school_id: Data.school_id,
        });

        if (existing) {
            if (existing.subject_ids.length < newSubjectIds.length) {
                // Case: Existing has fewer IDs than new → Merge (Add new ones)
                const existingSubjectIdsSet = new Set(existing.subject_ids.map(id => id.toString()));

                // Add only new subject_ids that are not in existing ones
                newSubjectIds.forEach(id => existingSubjectIdsSet.add(id.toString()));

                // Convert back to ObjectId[]
                existing.subject_ids = Array.from(existingSubjectIdsSet).map(id => new Types.ObjectId(id));
            } else {
                // Case: Existing has more IDs than new → Replace (Use only new ones)
                existing.subject_ids = newSubjectIds;
            }

            // Check if status is 0, update to 1
            if (existing.status === 0) {
                existing.status = 1;
            }

            await existing.save();
            return { message: "Class Sections updated successfully", result: existing };
        } else {
            // Create a new classroom if it doesn't exist
            const classroom = new Classroom({
                class_id: Data.class_id,
                section_id: Data.section_id,
                subject_ids: newSubjectIds, // Store subject_ids as ObjectId[]
                school_id: Data.school_id,
                status: 1, // Set status to 1 for new classrooms
                created_by: Data.user_id,
                created_at: getEpochTime(),
            });

            const result = await classroom.save();
            return { message: "Class Sections created successfully", result };
        }
    },

    getClassroom: async (school_id: string) => {
        try {
            // Fetch all classrooms associated with the given school_id
            const classrooms = await Classroom.find({ school_id: school_id, status: 1 });

            if (!classrooms || classrooms.length === 0) {
                return { message: "No classrooms found for this school." };
            }

            // Extract unique class_ids, section_ids, and subject_ids
            const classIds = [...new Set(classrooms.map(c => c.class_id))];
            const sectionIds = [...new Set(classrooms.map(c => c.section_id))];
            const subjectIds = [...new Set(classrooms.flatMap(c => c.subject_ids))];

            // Fetch Class Names
            const classes = await Class.find({ _id: { $in: classIds }, status: 1 }, { _id: 1, name: 1 });
            const classMap = new Map(classes.map(c => [c._id.toString(), c.name]));

            // Fetch Section Names
            const sections = await Section.find({ _id: { $in: sectionIds }, status: 1 }, { _id: 1, name: 1 });
            const sectionMap = new Map(sections.map(s => [s._id.toString(), s.name]));

            // Fetch Subject Names
            const subjects = await Subject.find({ _id: { $in: subjectIds }, status: 1 }, { _id: 1, name: 1 });
            const subjectMap = new Map(subjects.map(s => [s._id.toString(), s.name]));

            // Format Classroom Data
            const formattedClassrooms = classrooms.map(classroom => ({
                school_id: classroom.school_id,
                class_id: classroom.class_id,
                class_name: classMap.get(classroom.class_id.toString()) || "Unknown Class",
                section_id: classroom.section_id,
                section_name: sectionMap.get(classroom.section_id.toString()) || "Unknown Section",
                subject_ids: classroom.subject_ids,
                subject_names: classroom.subject_ids.map(id => subjectMap.get(id.toString()) || "Unknown Subject"),
            }));

            return {
                message: "Classrooms fetched successfully",
                result: formattedClassrooms,
            };
        } catch (error) {
            return { message: "Error fetching classrooms", error: error };
        }
    },

    updateclassroom: async (Data: Partial<Data> & { id: string }) => {
        if (!Data.subject_ids || Data.subject_ids.length === 0) {
            throw new Error("subject_ids is required and must contain at least one subject.");
        }

        const newSubjectIds = Data.subject_ids.map(id => new Types.ObjectId(id));

        // Ensure classroomId is a valid ObjectId
        if (!Types.ObjectId.isValid(Data.id)) {
            throw new Error("Invalid classroom ID.");
        }

        // Find the classroom by ID
        const existing = await Classroom.findById(new Types.ObjectId(Data.id));
        if (!existing) {
            throw new Error("Classroom not found.");
        }

        // Merge or replace subject_ids
        const existingSubjectIdsSet = new Set(existing.subject_ids.map(id => id.toString()));
        if (existingSubjectIdsSet.size < newSubjectIds.length) {
            newSubjectIds.forEach(id => existingSubjectIdsSet.add(id.toString()));
            existing.subject_ids = Array.from(existingSubjectIdsSet).map(id => new Types.ObjectId(id));
        } else {
            existing.subject_ids = newSubjectIds;
        }

        // Update other fields and ensure ObjectId conversion
        existing.class_id = Data.class_id ? new Types.ObjectId(Data.class_id) : existing.class_id;
        existing.section_id = Data.section_id ? new Types.ObjectId(Data.section_id) : existing.section_id;
        existing.school_id = Data.school_id ? new Types.ObjectId(Data.school_id) : existing.school_id;

        if (existing.status === 0) {
            existing.status = 1;
        }

        existing.updated_by = Data.user_id ? new Types.ObjectId(Data.user_id) : existing.updated_by;
        existing.updated_at = getEpochTime();

        await existing.save();
        return { message: "Class Sections updated successfully", result: existing };
    },

    deleteClassroom: async (id: string) => {
        // return await School.findByIdAndDelete(id);
        const result = await Classroom.findByIdAndUpdate(id, { status: 0 }, { new: true });

        if (result) {
            return { message: "Classname deleted successfully", result };
        } else {
            return { message: "No Classname found", result: [] };
        }
    }

}