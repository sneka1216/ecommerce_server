import mongoose,{Schema} from "mongoose";


const orderSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'Customer',
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
    },
    status:{
        type: String,
        default:'Placed'
    },
    deliveryDate:{
        type: Date,
        default: new Date(new Date().getTime()+(5*24*60*60*1000))
    },
    ShippingAddress: {
        type: Object,
    },
    paymentMode: {
        type: String,
        required:true
    },
    paymentId: {
        type: String,
    },
}, { timestamps: { createdAt: true, updatedAt: true } })

export default mongoose.model('Order',orderSchema)