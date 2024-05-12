import express from "express";
import Product from "../models/product.js";

const productController = express.Router();

productController.post('/addProduct', async (req, res) => {
    const body = req.body;
    const product = await Product.create({
        name: body?.name,
        description: body?.name,
        price: body?.price,
        image: body?.image,
        stock:body?.stock
    })
    if (product) {
        res.send({msg:'product added',product:product})
    } else {
        res.send({msg:'failed to add product'})
    }
})

productController.get('/allProduct', async (req, res) => {
    const product = await Product.find();
    if (product) {
        res.send(product)
    } else {
        res.send('product query')
    }
})

productController.put('/updateProduct', async (req, res) => {
    const body = req.body;
    const product = await Product.findByIdAndUpdate({
        _id: body._id
    },{
        name: body.name,
        description: body.description,
        image:body.image,
        price: body.price,
        stock:body.stock
    })
    if (product) {
        const updatedProduct = await Product.findOne({ _id: body._id })
        res.send(updatedProduct)
    } else {
        res.send('product updation failed')
    }
})

productController.delete('/deleteProduct', async (req, res) => {
    const body = req.body;
    const product = await Product.findByIdAndDelete(body._id)
    if (product) {
        res.send(product)
    } else {
        res.send('product deletion failed')
    }
})

productController.delete('/deleteAll', async (req, res) => {
    const product = await Product.deleteMany();
    if (product) {
        res.send('deleted')
    } else {
        res.send('product deletion is failed')
    }
})


export default productController;