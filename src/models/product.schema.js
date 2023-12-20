import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxLength: [100, "Product name must not exceed 100 chars"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        maxLength: [5, "5 chars price max"],
    },
    description: {
        type: String,
    },
    photo: [
        {
            secure_url: {
                type: String,
                required: true,
            }
        }
    ],
    stock: {
        type: Number,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }
},{ timestamps: true })

export default mongoose.model("Product", productSchema)