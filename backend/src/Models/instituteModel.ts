import mongoose, { Schema } from "mongoose";

const instituteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    created_at: {
        type: Number,
        required: true,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
    },
    updated_at: {
        type: Number,
        required: false,
    }
});

const connection = mongoose.connection.useDb("qpeUsers");
const Institute = connection.model("Institute", instituteSchema);
export default Institute;
