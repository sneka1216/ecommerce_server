import mongoose,{Schema} from "mongoose";


const cartSchema = new mongoose.Schema({
    user:{
        type: String,
        required:true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required:true
        },
        quantity: {
            type: Number,
            required:true
        }
    }],
    totalPrice: {
        type: Number,
        default:0
    }
}, { timestamps: { createdAt: true, updatedAt: true } })

export default mongoose.model('Cart',cartSchema)