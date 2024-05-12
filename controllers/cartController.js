import express from "express";
import Cart from "../models/cart.js";

const cartController = express.Router()

cartController.post('/addToCart', async (req, res) => {
    const body = req.body;
    const existingCart = await Cart.findOne({ email: body.email });
    const existingCartProducts = await existingCart.products
    const existingProduct = await existingCartProducts.find((i) => i.product == body.productData.product)
    if (existingProduct) {
        existingProduct.quantity = body.productData.quantity
    } else {
        existingCartProducts.push(body?.productData)
    }
    // let totalPrice = 0
    // existingCartProducts.map((i) => totalPrice += (i?.product?.price * i?.quantity))
    const totalPrice = existingCartProducts.reduce((total, i) => total + (i?.product?.price * i?.quantity))
    const cart = await Cart.findOneAndUpdate({ email: body.email }, { products: existingCartProducts, totalPrice })
    if (cart) {
        const updatedCart = await Cart.findOne({ email: body.email }).populate('products')
        res.send(updatedCart)
    }
})

cartController.post('/removeFromCart', async (req, res) => {
    const body = req.body;
    const existingCart = await Cart.findOne({ email: body.email });
    const updatedCartProducts = await existingCart.products.filter((i) => i.product != body.product)
    const totalPrice = existingCartProducts.reduce((total, i) => total + (i?.product?.price * i?.quantity))
    const cart = await Cart.findOneAndUpdate({ email: body.email }, { products: updatedCartProducts,totalPrice })
    if (cart) {
        const updatedCart = await Cart.findOne({ email: body.email }).populate('products')
        res.send(updatedCart)
    }
})

cartController.post('/clearCart', async (req, res) => {
    const body = req.body;
    const cart = await Cart.findOneAndUpdate({ email: body.email }, { products: [] , totalPrice:0})
    res.send(cart)

})

export default cartController;