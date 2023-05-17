import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    cost: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: [],
    },
    weight: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
},
},
{
    timestamps: true,
});

export default mongoose.model('Product', ProductSchema);