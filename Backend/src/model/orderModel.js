import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
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
      type: Date, // Change this from Number to Date
      required: true,
      default: Date.now, // Automatically set the current date if not provided
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
