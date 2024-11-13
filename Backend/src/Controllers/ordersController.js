import OrderModel from '../model/orderModel.js';
import UserModel from './../model/UserModel.js';
import Stripe from 'stripe';

// getway intialization

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use environment variable for security
const currency = 'inr';
const deliveryCharges = 10;

const placeOrder = async (req, res) => {
  try {
    let { userId, items, amount, address } = req.body;

    // Ensure amount is a valid number and set a default value if it's not
    if (isNaN(amount) || amount <= 0) {
      amount = 100; // Default amount if invalid
    }

    // Validate other fields as necessary
    if (!userId || !items || !address) {
      return res
        .status(400)
        .json({ message: 'Missing required fields', success: false });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'cash',
      payment: false,
      date: new Date(),
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

    res
      .status(200)
      .json({ message: 'Order placed successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
const placeOrderStripe = async (req, res) => {
  try {
    let { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }
    if (isNaN(amount) || amount <= 0) {
      amount = 100;
    }
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'stripe',
      payment: false,
      date: new Date(),
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: 'Delivery charges' },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    return res.status(200).json({
      session_url: session.url,
      message: 'Order placed successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
// verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  if (!orderId || !success || !userId) {
    return res
      .status(400)
      .json({ message: 'All fields are required', success: false });
  }
  try {
    if (success === 'true') {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      await UserModel.findByIdAndUpdate(
        userId,
        { cartData: {} },
        { new: true },
      );
      return res
        .status(200)
        .json({ message: 'Order verified successfully', success: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: 'No orders found', success: false });
    }
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const userOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await OrderModel.find({ userId });
    res.status(200).json({ orders, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
const updateorderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ message: 'All fields are required', success: false });
    }
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!order) {
      return res
        .status(404)
        .json({ message: 'Order not found', success: false });
    }
    res.status(200).json({
      order,
      success: true,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
const placeOrderRazorpay = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateorderStatus,
  verifyStripe
};
