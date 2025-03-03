import { Request, Response } from "express";

export const userController = {
    register: async (req: Request, res: Response) => {
        try {
            const {name, email, password, school_name, role} = req.body;
            console.log(name, email, password, role, school_name);
            
            res.send("hello world register")
        } catch (error) {
            console.error("Error in register:", error);
            return res.status(500).json({ error: "Something went wrong" });
        }
    }
};
