import express from "express";
import { userAuth } from "../middlewares/authMiddlewares.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", userAuth, createOrder);
router.post("/verify", userAuth, verifyPayment);

export default router;