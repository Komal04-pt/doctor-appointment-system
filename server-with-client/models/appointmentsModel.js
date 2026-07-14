import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "doctor",
    },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    amount: { type: String, required: true },

  visitStatus: {
  type: String,
  enum: ["scheduled", "completed", "no-show", "cancelled"],
  default: "scheduled"
},
    payment: { type: Boolean, default: false }, // typo fix: defult -> default
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export default appointmentModel;