import express from "express";

import auth from "../middleware/auth.js";
import { deleteAddress, getAddress, saveAddress } from "../Controllers/AddressController.js";

const addressRoute = express.Router();

addressRoute.post("/save", auth, saveAddress);
addressRoute.get("/get", auth, getAddress);
addressRoute.post("/delete", auth, deleteAddress);

export default addressRoute;