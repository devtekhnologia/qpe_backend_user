import mongoose, { Schema } from "mongoose";

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