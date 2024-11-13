import express from 'express';
import {
  addToCart,
  updateCart,
  getUserCart,
} from './../Controllers/cartController.js';
import auth from '../Middleware/auth.js';

const CartRouter = express.Router();

// Add to cart
CartRouter.post('/add', auth, addToCart);
// Update cart
CartRouter.post('/update', auth, updateCart);
// Get user cart
CartRouter.post('/getCart', auth, getUserCart); // Ensure this matches your frontend request

export default CartRouter;
