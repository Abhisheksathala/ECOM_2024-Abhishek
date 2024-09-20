import express from "express";
import cors from "cors";
import "dotenv/config";

import connectCloudinary from "./src/Cloudnary/Cloudinary.js";
import INDEXdb from "./src/DB/INDEXdb.js";
import UserRouter from "./src/Routes/UserRouter.js";
import ProductRouter from "./src/Routes/ProductRouter.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// api end points
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);

INDEXdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });

    app.get("/", (req, res) => {
      res.send("Hello World!  api is working ");
    });
    connectCloudinary();
  })
  .catch((err) => console.log("MONGO DB CONNECTION FAILED", err));
