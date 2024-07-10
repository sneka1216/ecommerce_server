import express from "express";
import Cart from "../models/cart.js";

const cartController = express.Router();

cartController.post("/addToCart", async (req, res) => {
  console.log("hi");
  const body = req.body;
  console.log("hi", body.user);
  const existingCart = await Cart.findOne({ user: body.user });
  const existingCartProducts = await existingCart.products;
  console.log("hi", existingCartProducts)
    const existingProduct = await existingCartProducts.find(
      (i) => i.product
  );
  // console.log("hi3",body.products.product)
  console.log("hi2",existingProduct)
  const cart = await Cart.findOneAndUpdate(
    { user: body.user },
    { products: [...existingCart?.products, ...body?.products], totalPrice: 0 }
  );
  console.log("cart", cart);
  let updatedCart = await Cart.findOne({ user: body.user }).populate({
    path: "products.product",
    model: "Product",
  });
  console.log("updatedcart", updatedCart);

  res.send(updatedCart);
  

  // if (existingProduct) {
  //   existingProduct.quantity = body.productData.quantity;
  // } else {
  //   existingCartProducts.push(body?.productData);
  // }
  // console.log("existingcartproducts", existingCartProducts)

  // let totalPrice = 0

  // existingCartProducts.map((i) => totalPrice += (i?.product?.price * i?.quantity))
  // console.log("totalprice",totalPrice)
  // const totalPrice = existingCartProducts.reduce(
  //   (total, i) => total + i?.product?.price * i?.quantity
  // );
  // const cart = await Cart.findOneAndUpdate(
  //   { user: body.user },
  //   { products: existingCartProducts, totalPrice }
  // );
  // if (cart) {
  //   const updatedCart = await Cart.findOne({ email: body.email }).populate(
  //     "products"
  //   );
  //   res.send(updatedCart);
  // }
});

cartController.post("/removeFromCart", async (req, res) => {
  const body = req.body;
  const existingCart = await Cart.findOne({ email: body.email });
  const updatedCartProducts = await existingCart.products.filter(
    (i) => i.product != body.product
  );
  const totalPrice = existingCartProducts.reduce(
    (total, i) => total + i?.product?.price * i?.quantity
  );
  const cart = await Cart.findOneAndUpdate(
    { email: body.email },
    { products: updatedCartProducts, totalPrice }
  );
  if (cart) {
    const updatedCart = await Cart.findOne({ email: body.email }).populate(
      "products"
    );
    res.send(updatedCart);
  }
});

cartController.post("/clearCart", async (req, res) => {
  const body = req.body;
  const cart = await Cart.findOneAndUpdate(
    { email: body.email },
    { products: [], totalPrice: 0 }
  );
  res.send(cart);
});

export default cartController;
