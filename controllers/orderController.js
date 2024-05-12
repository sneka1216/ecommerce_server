import express from 'express';
import Order from '../models/order.js';
import { sendOrderConfirmationEmail } from '../mail.js';

const orderController = express.Router();


orderController.post('/createOrder', async (req, res) => {
    const body = req.body
    const order = await Order.create({
        user: body._id,
        products: body.products,
        ShippingAddress: body.ShippingAddress,
        totalPrice: body.totalPrice,
        paymentMode: body?.paymentMode,
        paymentId:body?.paymentId || ''
    })
    const createdOrder= await Order.findById(order._id).populate('user')
    if (order) {
        await sendOrderConfirmationEmail(createdOrder.user.email,createdOrder.user.name,order._id)
        res.send(order)
    }
})

orderController.get('/getAllOrders', async (req, res) => {
    const orders = await Order.find()
    res.send(orders)
})

orderController.get('/getOrdersByEmailId/:email', async (req, res) => {
    const orders = await Order.find({email:req.params.email})
    res.send(orders)
})

orderController.post('/updateOrder', async (req, res) => {
    const body = req.body;
    const order = await Order.findByIdAndUpdate({ _id: body._id }, { status: body.status, deliveryDate: body.deliveryDate })
    if (order) {
        const updatedOrder = await Order.findById(body._id)
        res.send(updatedOrder)
    } else {
        res.send('Order failed')
    }
})

export default orderController;