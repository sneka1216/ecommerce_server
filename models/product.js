import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,'please enter the name of the product']
    },
    description: {
        type: String,
        required:[true,'please enter the description of the product']
    },
    price: {
        type: Number,
        required:[true,'please enter the price of the product']
    },
    image: {
        type: String,
        required:[true,'please enter the image of the product']
    },
    stock: {
        type: String,
        required:[true,'please enter the stock of the product']
    }
    

}, { timestamps: { createdAt: true, updatedAt: true } })


export default mongoose.model('Product', productSchema);