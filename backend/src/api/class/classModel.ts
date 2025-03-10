import mongoose, { Schema } from "mongoose";
import { commonValidations } from "../../utils/commonValidations";
import { z } from "zod";

export interface Data {
    name: string;
    reg_id: string;
    status: number;
    created_by: string;
    created_at: string;
    user_id?: string
}

const create = z.object({
    name: commonValidations.name,
    reg_id: commonValidations.id,
    user_id: commonValidations.id,
});

export const createSchema = { body: create };

const id = z.object({
    id: commonValidations.id
});

export const idSchema = { params: id };

const update = create.merge(
    z.object({
        id: commonValidations.id,
    })
);

export const updateSchema = {body: update};

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    reg_id: {
        type: String,
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
const Class = connection.model("Class", classSchema);
export default Class;