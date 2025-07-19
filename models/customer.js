import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
    },
    password: {
      type: String,
      required: [true, "please enter your password"],
    },
    photo: {
      type: String,
    },
    address: {
      type: Object,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("User", customerSchema);
