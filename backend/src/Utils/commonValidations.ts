import {z} from "zod"

export const commonValidations = {
    id: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ID format. Must be a valid ObjectId"),
    name: z.string().min(1, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    number: z.number(),
    string: z.string().min(2, "It must be at least 2 characters long"),
    epochTime: z.number().int().nonnegative("Epoch time must be a positive integer"),
}