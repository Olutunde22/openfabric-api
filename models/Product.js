
import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product Price is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Product Image url is required'],
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })


const Product = new mongoose.model('Product', ProductSchema)

export default Product