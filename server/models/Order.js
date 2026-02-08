import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    itemsDetails: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Preparing", "Delivered"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
