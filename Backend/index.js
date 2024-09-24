import express from "express";
import cors from "cors";
import "dotenv/config";

import connectCloudinary from "./src/Cloudnary/Cloudinary.js";
import INDEXdb from "./src/DB/INDEXdb.js";
import UserRouter from "./src/Routes/UserRouter.js";
import ProductRouter from "./src/Routes/ProductRouter.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Initialize Cloudinary before starting the server
connectCloudinary();

// API Endpoints
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! API is working");
});

// Fallback route for unmatched URLs
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server after connecting to the database
INDEXdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED", err);
  });
