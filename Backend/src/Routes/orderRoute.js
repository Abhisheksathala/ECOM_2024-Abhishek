import express from 'express';
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateorderStatus,
  verifyStripe,
} from './../Controllers/ordersController.js';
import adminAuth from '../Middleware/AdminAuth.js'; // Ensure the extension is .js
import authUser from './../Middleware/auth.js'; // Ensure the extension is .js

const OrderRouter = express.Router();

// Admin routes
OrderRouter.post('/list', adminAuth, allOrders);
OrderRouter.post('/status', adminAuth, updateorderStatus);

// Payment routes
OrderRouter.post('/placeorder', authUser, placeOrder);
OrderRouter.post('/placeorderstripe', authUser, placeOrderStripe);
OrderRouter.post('/placeorderrazorpay', authUser, placeOrderRazorpay);

// User orders route
OrderRouter.post('/userorders', authUser, userOrders);

// verifyStripe route
OrderRouter.post('/verifystripe', authUser, verifyStripe);

export default OrderRouter;
