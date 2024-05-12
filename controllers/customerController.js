
import express from 'express'
import Customer from '../models/customer.js';
import Cart from '../models/cart.js';

const customer = express.Router()

customer.post('/signup', async (req, res) => {
    const body = req.body;
    const existingUser = await Customer.findOne({ email: body?.email })
    console.log('existing',existingUser)
    if (existingUser) {
        res.send({
            status: 'fails',
            message: 'user is already register'
        })
    } else {
        try {
        const user = new Customer({
            name:body?.name,
            email: body?.email,
            password:body?.password
        })
            await user.save();
            const cart = await Cart?.create({user:user?.email})
            res.send({ user , cart })
        } catch (error) {
            console.log('erros',error)
        }
      
    }
})

customer.post('/login', async (req, res) => {
    const body = req.body;
    const user = await Customer.findOne({ email: body?.email })
    console.log('user',user)
    if (!user) {
        res.send('invalid user')
    } else if (user.password !== body.password) {
        res.send('invalid credentials')
    } else {
       const cart = await Cart.findOne({ email: body?.email })
       res.send({ user, cart })
    }
})

customer.put('/updateAccount', async (req, res) => {
       const body = req.body;
    const user = await Customer.findOneAndUpdate({email:body.email},{
        name:body.name,
        email: body.email,
        password: body.password,
        photo:body.photo
    });
    if (user) {
        const updatedUser = await Customer.findOne({ email: body.email })
        res.send(updatedUser)
    } else {
        res.send('failed')
    } 
})

customer.delete('/deleteOne', async (req, res) => {
    const body = req.body;
    const user = await Customer.deleteOne({ email: body.email })
    if (user) {
        res.send(user)
    } else {
        res.send('failed deletion')
    }
})

customer.delete('/deleteAll', async (req, res) => {
    const user = await Customer.deleteMany();
    res.send('deleted')
})

export default customer;