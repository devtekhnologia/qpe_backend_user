import { z } from "zod";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const createSchoolSchema = z.object({
    user_id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
    name: z.string().min(3, "School name must be at least 3 characters long"),
});

export const getSchoolsSchema = z.object({
    id: z.string().regex(objectIdPattern, "Invalid institute ID format. Must be a valid ObjectId"),
});

export const updateSchoolSchema = z.object({
    user_id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
    _id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
    name: z.string().min(3, "School name must be at least 3 characters long"),
});

export const deleteSchoolsSchema = z.object({
    id: z.string().regex(objectIdPattern, "Invalid institute ID format. Must be a valid ObjectId"),
});

export const createClassNameSchema = z.object({
    name: z.string().min(3, "Class name must be at least 1 character long"),
    school_id: z.string().regex(objectIdPattern, "Invalid school_id format. Must be a valid ObjectId"),
    user_id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
});