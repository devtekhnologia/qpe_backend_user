import {z} from "zod"

export const commonValidations = {
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ID format. Must be a valid ObjectId"),
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    school_id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid school ID format. Must be a valid ObjectId"),
    user_id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user ID format. Must be a valid ObjectId"),
    role_id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid role ID format. Must be a valid ObjectId"),
}