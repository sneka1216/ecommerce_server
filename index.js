import express from "express";
import cors from "cors";
import customerController from "./controllers/customerController.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productController from "./controllers/productController.js";
import cartController from "./controllers/cartController.js";
import orderController from "./controllers/orderController.js";

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use("/customer", customerController);
server.use("/product", productController);
server.use("/cart", cartController);
server.use("/order", orderController);

server.listen(5000, () => {
  mongoose
    .connect(
      "mongodb+srv://sneka1216:sneka1216@cluster0.30nanly.mongodb.net/flamora?retryWrites=true&w=majority&appName=Cluster0"
    )

    .then(() => {
      console.log("DB connected");
    });
});
