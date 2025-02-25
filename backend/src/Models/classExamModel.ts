import mongoose, { Schema } from "mongoose";

const classExamSchema = new Schema({
    classroom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "classroom",
        required: true,
    },
    subject_ids: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subject",
            required: true,
        }
    ],
    exam_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exam",
        required: true,
    },
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school",
        required: true,
    },
    status: {
        type: Number,
        default: 1
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    created_at: {
        type: Number,
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
    },
    updated_at: {
        type: Number,
        required: false,
    },
})

const connection = mongoose.connection.useDb("qpeUsers");
const ClassExam = connection.model("ClassExam", classExamSchema);
export default ClassExam;