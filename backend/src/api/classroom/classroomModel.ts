import mongoose, { Schema } from "mongoose";
import { z } from "zod";
import { commonValidations } from "../../utils/commonValidations";

export interface Data {
    class_id: string;
    section_id: string;
    subject_ids: string[]; // Change from string to string[]
    school_id: string;
    status: number;
    created_by: string;
    created_at: string;
    user_id?: string
}

const createClassroom = z.object({
    class_id: commonValidations.id,
    section_id: commonValidations.id,
    subject_ids: z.array(commonValidations.id), // Change subject_id to subject_ids (array)
    school_id: commonValidations.id,
    user_id: commonValidations.id,
});

export const createSchema = { body: createClassroom };

export const id = z.object({
    id: commonValidations.id
});

export const idSchema = { params: id };

const updateClassroom = createClassroom.merge(
    z.object({
        id: commonValidations.id,
    })
);

export const updateSchema = { body: updateClassroom };

const classroomSchema = new Schema({
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
        required: true,
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,
    },
    subject_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subject",
            required: true,
        }
    ],
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school",
        required: true,
    },
    status: {
        type: Number,
        required: false,
        default: 1
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    created_at: {
        type: String,
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
    },
    updated_at: {
        type: String,
        required: false,
    },
})

const connection = mongoose.connection.useDb("qpeUsers");
const Classroom = connection.model("Classroom", classroomSchema);
export default Classroom;