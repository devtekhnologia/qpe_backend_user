import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"school",
        required: true,
    },
    status: {
        type: Number,
        required: false,
        default: 1
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
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
const Subject = connection.model("Subject", subjectSchema);
export default Subject;