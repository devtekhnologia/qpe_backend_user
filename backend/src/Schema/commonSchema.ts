import { z } from "zod";

const objectIdPattern = /^[a-f\d]{24}$/i;
const objectIdSchema = z.string().regex(objectIdPattern, "Invalid ID format. Must be a valid ObjectId");
const nameSchema = z.string().min(1, "Name must be at least 1 characters long");

export const createSchoolSchema = z.object({
    user_id: objectIdSchema,
    name: nameSchema,
});

export const createSchema = z.object({
    name: nameSchema,
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const updateSchema = z.object({
    id: objectIdSchema,
    name: nameSchema,
    user_id: objectIdSchema,
});

export const createClassroomSchema = z.object({
    class_id: objectIdSchema,
    section_id: objectIdSchema,
    subject_ids: z.array(objectIdSchema), // Change subject_id to subject_ids (array)
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const updateClassroomSchema = z.object({
    id: objectIdSchema,
    class_id: objectIdSchema,
    section_id: objectIdSchema,
    subject_ids: z.array(objectIdSchema), // Change subject_id to subject_ids (array)
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const createClassExamSchema = z.object({
    classroom_id: objectIdSchema,
    exam_id: objectIdSchema,
    subject_ids: z.array(objectIdSchema), // Change subject_id to subject_ids (array)
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const updateClassExamSchema = z.object({
    id: objectIdSchema,
    classroom_id: objectIdSchema,
    exam_id: objectIdSchema,
    subject_ids: z.array(objectIdSchema), // Change subject_id to subject_ids (array)
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});