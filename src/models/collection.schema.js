import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a collection name"],
            trim: true,
            maxLength: [120, "Collction name should not exceed 120 chars"]
        }
    },
    { timestamps: true }
)

export default mongoose.model("Collection", collectionSchema);