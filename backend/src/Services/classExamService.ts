import { Types } from "mongoose";
import { getEpochTime } from "../Utils/epochTime";
import ClassExam from "../Models/classExamModel";
import { Data } from "../Interfaces/classexamInterface";

export const classExamService = {

    createClassExam: async (Data: Partial<Data>) => {
        if (!Data.subject_ids || Data.subject_ids.length === 0) {
            throw new Error("subject_ids is required and must contain at least one subject.");
        }

        // Convert new subject_ids to ObjectId[]
        const newSubjectIds = Data.subject_ids.map(id => new Types.ObjectId(id));

        // Check if the ClassExam already exists
        const existing = await ClassExam.findOne({
            classroom_id: Data.classroom_id,
            exam_id: Data.exam_id,
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
            return { message: "Class Exams updated successfully", result: existing };
        } else {
            // Create a new classroom if it doesn't exist
            const classexam = new ClassExam({
                classroom_id: Data.classroom_id,
                exam_id: Data.exam_id,
                subject_ids: newSubjectIds, // Store subject_ids as ObjectId[]
                school_id: Data.school_id,
                created_by: Data.user_id,
                created_at: getEpochTime(),
            });

            const result = await classexam.save();
            return { message: "Class Exam created successfully", result };
        }
    },


    getClassExam: async (school_id: string) => {
        try {
            const classexams = await ClassExam.aggregate([
                {
                    $match: {
                        school_id: new Types.ObjectId(school_id),
                        status: 1
                    }
                },

                // Lookup Exam details
                {
                    $lookup: {
                        from: "exams",
                        let: { examId: "$exam_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$examId"] },
                                            { $eq: ["$status", 1] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "examInfo"
                    }
                },
                {
                    $unwind: {
                        path: "$examInfo",
                        preserveNullAndEmptyArrays: true
                    }
                },

                // Lookup Classroom details
                {
                    $lookup: {
                        from: "classrooms",
                        let: { classroomId: "$classroom_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$classroomId"] },
                                            { $eq: ["$status", 1] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "classroomInfo"
                    }
                },
                {
                    $unwind: {
                        path: "$classroomInfo",
                        preserveNullAndEmptyArrays: true
                    }
                },

                // Lookup Class details from 'class' collection
                {
                    $lookup: {
                        from: "classes",
                        let: { classId: "$classroomInfo.class_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$classId"] },
                                            { $eq: ["$status", 1] }
                                        ]
                                    }
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

                // Lookup Section details from 'section' collection
                {
                    $lookup: {
                        from: "sections",
                        let: { sectionId: "$classroomInfo.section_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$sectionId"] },
                                            { $eq: ["$status", 1] }
                                        ]
                                    }
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

                // Lookup Subject details
                {
                    $lookup: {
                        from: "subjects",
                        let: { subjectIds: "$subject_ids" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $in: ["$_id", "$$subjectIds"] },
                                            { $eq: ["$status", 1] }
                                        ]
                                    }
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
                        exam_id: 1,
                        exam_name: { $ifNull: ["$examInfo.name", "Unknown Exam"] },
                        class_id: "$classroomInfo.class_id",
                        class_name: { $ifNull: ["$classInfo.name", "Unknown Class"] },
                        section_id: "$classroomInfo.section_id",
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


            if (!classexams || classexams.length === 0) {
                return { message: "No classexams found for this school." };
            }

            return {
                message: "Class exams fetched successfully",
                result: classexams
            };
        } catch (error) {
            return { message: "Error fetching class exams", error: error };
        }
    },


    updateClassexam: async (Data: Partial<Data> & { id: string }) => {
        if (!Data.subject_ids || Data.subject_ids.length === 0) {
            throw new Error("subject_ids is required and must contain at least one subject.");
        }

        const newSubjectIds = Data.subject_ids.map(id => new Types.ObjectId(id));

        // Ensure classexamId is a valid ObjectId
        if (!Types.ObjectId.isValid(Data.id)) {
            throw new Error("Invalid classexam ID.");
        }

        // Find the classroom by ID
        const existing = await ClassExam.findById(new Types.ObjectId(Data.id));
        if (!existing) {
            throw new Error("Classexam not found.");
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
        existing.classroom_id = Data.classroom_id ? new Types.ObjectId(Data.classroom_id) : existing.classroom_id;
        existing.exam_id = Data.exam_id ? new Types.ObjectId(Data.exam_id) : existing.exam_id;
        existing.school_id = Data.school_id ? new Types.ObjectId(Data.school_id) : existing.school_id;

        if (existing.status === 0) {
            existing.status = 1;
        }

        existing.updated_by = Data.user_id ? new Types.ObjectId(Data.user_id) : existing.updated_by;
        existing.updated_at = getEpochTime();

        await existing.save();
        return { message: "Class Exam updated successfully", result: existing };
    },

    deleteClassExam: async (id: string) => {
        const result = await ClassExam.findByIdAndUpdate(id, { status: 0 }, { new: true });

        if (result) {
            return { message: "Class exam deleted successfully", result };
        } else {
            return { message: "No Class exam found", result: [] };
        }
    },
}