import express from "express";
import cors from "cors";
import "dotenv/config";

import INDEXdb from "./src/DB/INDEXdb.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// api end points

INDEXdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });

    app.get("/", (req, res) => {
      res.send("Hello World!  api is working ");
    });
  })
  .catch((err) => console.log("MONGO DB CONNECTION FAILED", err));
