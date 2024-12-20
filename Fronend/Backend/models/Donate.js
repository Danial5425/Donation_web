import mongoose from "mongoose";

const DonateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneno: {
        type: Number,
        required: true,
    },
    type_of_donation: {
        type: String,
        required: true,
    },
    quantity: {
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

    status: {
        type: String,
        default: "Pending",
    },
    Collectedby:{
        type:String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // 
    dooner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming "User" is the donor model
    },
    ngo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NgoUser", // Assuming "NgoUser" is the NGO model
    },

});

const DonateModel = mongoose.model("Donate", DonateSchema);

export default DonateModel;
