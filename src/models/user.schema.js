import mongoose from "mongoose";
import authRoles from "../utils/authRoles.js"

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [60, "Name should not exceed 60 chars"],
        trim: true,
    },
    email: {
        type: String,
        requided: [true, "Email is required"],
    },
    password: {
        type: String,
        requided:[true, "Password is required"],
        minLength: [8, "Password must be at least 8 chars"],
        select: false,
    },
    roles: {
        type: String,
        enum: Object.values(authRoles),
        default: authRoles.USER,
    }
}, {timestamps: true} )

export default mongoose.model("User", userSchema)