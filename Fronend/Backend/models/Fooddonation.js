import mongoose from "mongoose";

const FooddonationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    packaging: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: "", // Allow empty description if not provided
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
        type: String,  // Changed to String to allow leading zeros
        required: true,
        match: /^[1-9][0-9]{5}$/, // Match for valid six-digit pincode
    },
    status: {
        type: String,
        default: "Pending",
    },
    Collectedby: {
        type: String,
        default: null,
    },
    latitude: {
        type: Number,
        default: null, 
    },
    longitude: {
        type: Number,
        default: null, 
        
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const FooddonationModel = mongoose.model("Fooddonation", FooddonationSchema);
export  {FooddonationModel as Fooddonation};
