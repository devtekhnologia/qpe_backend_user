import { Types } from "mongoose";
import { Data } from "../../interfaces/classroomInterface";
import Classroom from "./classroomModel";
import { getEpochTime } from "../../utils/epochTime";


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
            const classrooms = await Classroom.aggregate([
                { 
                    $match: { 
                        school_id: new Types.ObjectId(school_id), 
                        status: 1 
                    } 
                },
    
                // Lookup Class details with status = 1
                {
                    $lookup: {
                        from: "classes",
                        let: { classId: "$class_id" },
                        pipeline: [
                            { 
                                $match: { 
                                    $expr: { $and: [
                                        { $eq: ["$_id", "$$classId"] },
                                        { $eq: ["$status", 1] } 
                                    ]}
                                } 
                            }
                        ],
                        as: "classInfo"
                    }
                },
                { 
                    $unwind: { 
                        path: "$classInfo", 
                        preserveNullAndEmptyArrays: true 
                    } 
                },
    
                // Lookup Section details with status = 1
                {
                    $lookup: {
                        from: "sections",
                        let: { sectionId: "$section_id" },
                        pipeline: [
                            { 
                                $match: { 
                                    $expr: { $and: [
                                        { $eq: ["$_id", "$$sectionId"] },
                                        { $eq: ["$status", 1] } 
                                    ]}
                                } 
                            }
                        ],
                        as: "sectionInfo"
                    }
                },
                { 
                    $unwind: { 
                        path: "$sectionInfo", 
                        preserveNullAndEmptyArrays: true 
                    } 
                },
    
                // Lookup Subject details with status = 1
                {
                    $lookup: {
                        from: "subjects",
                        let: { subjectIds: "$subject_ids" },
                        pipeline: [
                            { 
                                $match: { 
                                    $expr: { $and: [
                                        { $in: ["$_id", "$$subjectIds"] },
                                        { $eq: ["$status", 1] }
                                    ]}
                                } 
                            }
                        ],
                        as: "subjectInfo"
                    }
                },
    
                // Format the output
                {
                    $project: {
                        _id: 0,
                        school_id: 1,
                        class_id: 1,
                        class_name: { $ifNull: ["$classInfo.name", "Unknown Class"] },
                        section_id: 1,
                        section_name: { $ifNull: ["$sectionInfo.name", "Unknown Section"] },
                        subject_ids: 1,
                        subject_names: {
                            $cond: {
                                if: { $isArray: "$subjectInfo" },
                                then: { $map: { input: "$subjectInfo", as: "s", in: "$$s.name" } },
                                else: ["Unknown Subject"]
                            }
                        }
                    }
                }
            ]);
    
            if (!classrooms || classrooms.length === 0) {
                return { message: "No classrooms found for this school." };
            }
    
            return {
                message: "Classrooms fetched successfully",
                result: classrooms
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
    },

    getClassroomSubjects: async (classroom_id: string) => {
        try {
            const classroomSubjects = await Classroom.aggregate([
                { 
                    $match: { 
                        _id: new Types.ObjectId(classroom_id), 
                        status: 1 
                    } 
                },
    
                // Lookup Subject details with status = 1
                {
                    $lookup: {
                        from: "subjects",
                        let: { subjectIds: "$subject_ids" },
                        pipeline: [
                            { 
                                $match: { 
                                    $expr: { $and: [
                                        { $in: ["$_id", "$$subjectIds"] },
                                        { $eq: ["$status", 1] }
                                    ]}
                                } 
                            }
                        ],
                        as: "subjectInfo"
                    }
                },
    
                // Format the output
                {
                    $project: {
                        _id: 0,
                        school_id: 1,
                        subject_ids: 1,
                        subject_names: {
                            $cond: {
                                if: { $isArray: "$subjectInfo" },
                                then: { $map: { input: "$subjectInfo", as: "s", in: "$$s.name" } },
                                else: ["Unknown Subject"]
                            }
                        }
                    }
                }
            ]);
    
            if (!classroomSubjects || classroomSubjects.length === 0) {
                return { message: "No classrooms found for this school." };
            }
    
            return {
                message: "Classroom Subjects fetched successfully",
                result: classroomSubjects
            };
        } catch (error) {
            return { message: "Error fetching classrooms", error: error };
        }
    },

}