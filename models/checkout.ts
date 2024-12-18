import mongoose, { Schema, model } from "mongoose";

import type { Checkout } from "@/types/checkout";

const checkoutSchema = new Schema({
  items: [
    {
      product_id: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderDate: { type: Date, default: Date.now },
  readyDate: { type: String, required: true },
  shipmentDate: { type: String, required: true },
});

const CheckoutModel = mongoose.models.Checkout || mongoose.model<Checkout>("Checkout", checkoutSchema);

export default CheckoutModel;
