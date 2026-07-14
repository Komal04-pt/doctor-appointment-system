import razorpayInstance from "../config/razorpay.js";
import crypto from "crypto";
import appointmentModel from "../models/appointmentModel.js";

// 1. ORDER CREATE
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in Rupees

    const options = {
      amount: amount * 100, // Razorpay paise me leta hai
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating order",
      error,
    });
  }
};

// 2. PAYMENT VERIFY
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId,
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).send({
        success: false,
        message: "Invalid signature - Payment verification failed",
      });
    }

    // Signature match — genuine payment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    res.status(200).send({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error verifying payment",
      error,
    });
  }
};