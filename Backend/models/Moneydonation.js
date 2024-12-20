import mongoose from "mongoose";

const MoneydonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    default: "Pending",
  },
  collectedBy: {
    type: String,
    default: null,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const MoneydonatioModel = mongoose.model("Moneydonation", MoneydonationSchema);

export {MoneydonatioModel as Moneydonation};
