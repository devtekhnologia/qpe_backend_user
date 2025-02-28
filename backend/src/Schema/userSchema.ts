import { z } from "zod";


export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  school_id:  z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  user_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
    
    role_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"), // MongoDB ObjectId validation
});
  

export const registerAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  school_name: z.string().min(2, "School name is required"),
   
    role_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"), // MongoDB ObjectId validation
});
  


export type RegisterUserInput = z.infer<typeof registerUserSchema>;


