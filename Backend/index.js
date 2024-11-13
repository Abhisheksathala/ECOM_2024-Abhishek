import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser'; // If you're using this package
import multer from 'multer';

import connectCloudinary from './src/Cloudnary/Cloudinary.js';
import INDEXdb from './src/DB/INDEXdb.js';
import UserRouter from './src/Routes/UserRouter.js';
import ProductRouter from './src/Routes/ProductRouter.js';
import CartRouter from './src/Routes/cartRoute.js';
import OrderRouter from './src/Routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Initialize Cloudinary before starting the server
connectCloudinary();

// API Endpoints
app.use('/api/user', UserRouter);
app.use('/api/product', ProductRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', OrderRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World! API is working');
});

// Fallback route for unmatched URLs
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server after connecting to the database
INDEXdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MONGO DB CONNECTION FAILED', err);
    process.exit(1); // Exit the process with a failure
  });
