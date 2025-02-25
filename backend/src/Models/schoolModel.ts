import { ref, required } from "joi";
import mongoose, { Schema } from "mongoose";

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Number, default: 1,
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
const School = connection.model("School", schoolSchema);
export default School;  