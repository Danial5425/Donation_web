import mongoose from "mongoose";

const NgosuserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  organizationName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
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
});

const NgosuserModel = mongoose.model("Ngosuser", NgosuserSchema);

export { NgosuserModel as Ngosuser };
