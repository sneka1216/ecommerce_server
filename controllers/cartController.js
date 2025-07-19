import express from "express";
import Cart from "../models/cart.js";

const cartController = express.Router();

cartController.get("/getAllCarts", async (req, res) => {
  const carts = await Cart.find().populate("products");
  res.send({ data: carts });
});

cartController.post("/addToCart", async (req, res) => {
  const body = req.body;

  try {
    const existingCart = await Cart.findOne({ user: body.user }).populate({
      path: "products.product",
      model: "Product",
    });

    console.log("existing cart", existingCart);

    if (existingCart) {
      let updatedProducts = [...existingCart.products];
      for (const bodyProduct of body?.products) {
        const productIndex = updatedProducts?.findIndex(
          (popProduct) =>
            String(popProduct.product._id) === String(bodyProduct.product)
        );

        if (productIndex > -1) {
          updatedProducts[productIndex].quantity += bodyProduct.quantity;
        } else {
          updatedProducts.push({
            product: bodyProduct.product,
            quantity: bodyProduct.quantity,
          });
        }
      }

      const totalPrice = updatedProducts.reduce((sum, item) => {
        const price = item.product.price || 0;
        return sum + price * item.quantity;
      }, 0);

      if (isNaN(totalPrice)) {
        console.error("Total price calculation resulted in NaN");
        totalPrice = 0; // Default to 0
      }

      // Update the cart with the modified products and total price
      await Cart.findOneAndUpdate(
        { user: body.user },
        { products: updatedProducts, totalPrice: totalPrice }
      );

      // Retrieve the updated cart
      let updatedCart = await Cart.findOne({ user: body.user }).populate({
        path: "products.product",
        model: "Product",
      });

      res.send(updatedCart);
    } else {
      // Handle case where the cart does not exist (create new cart)
      const newCart = new Cart({
        user: body.user,
        products: body.products,
        totalPrice: 0,
      });

      await newCart.save();
      res.send(newCart);
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).send("Server error");
  }
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
    { user: body.user },
    { products: [], totalPrice: 0 }
  );
  res.send("cart");
});

export default cartController;
