import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
