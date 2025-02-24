import { z } from "zod";

const objectIdPattern = /^[a-f\d]{24}$/i;
const objectIdSchema = z.string().regex(objectIdPattern, "Invalid ID format. Must be a valid ObjectId");
const nameSchema = z.string().min(1, "Name must be at least 1 characters long");

export const createSchoolSchema = z.object({
    user_id: objectIdSchema,
    name: nameSchema,
});

export const updateSchoolSchema = z.object({
    _id: objectIdSchema,
    user_id: objectIdSchema,
    name: nameSchema,
});

export const createClassNameSchema = z.object({
    name: nameSchema,
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const updateClassNameSchema = z.object({
    id: objectIdSchema,
    name: nameSchema,
    user_id: objectIdSchema,
});

export const createSectionSchema = z.object({
    name: nameSchema,
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const updateSectionSchema = z.object({
    id: objectIdSchema,
    name: nameSchema,
    user_id: objectIdSchema,
});

export const createSubjectSchema = z.object({
    name: nameSchema,
    school_id: objectIdSchema,
    user_id: objectIdSchema,
});

export const updateSubjectSchema = z.object({
    id: objectIdSchema,
    name: nameSchema,
    user_id: objectIdSchema,
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