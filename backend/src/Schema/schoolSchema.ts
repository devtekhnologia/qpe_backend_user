import { z } from "zod";

const objectIdPattern = /^[a-f\d]{24}$/i;

export const createSchoolSchema = z.object({
    user_id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
    name: z.string().min(3, "School name must be at least 3 characters long"),
    institute_id: z.string(),
});

export const getSchoolsSchema = z.object({
    id: z.string().regex(objectIdPattern, "Invalid institute ID format. Must be a valid ObjectId"),
});

export const updateSchoolSchema = z.object({
    user_id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
    _id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
    name: z.string().min(3, "School name must be at least 3 characters long"),
    // institute_id: z.string().regex(objectIdPattern, "Invalid user_id format. Must be a valid ObjectId"),
});

export const deleteSchoolsSchema = z.object({
    id: z.string().regex(objectIdPattern, "Invalid institute ID format. Must be a valid ObjectId"),
});