import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({
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
const Section = connection.model("Section", sectionSchema);
export default Section;