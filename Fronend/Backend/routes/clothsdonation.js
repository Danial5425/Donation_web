import express from "express";
import {Clothsdonation} from "../models/Clothsdonation.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
const router = express.Router();
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      gender,
      clothingType,
      size,
      quantity,
      description,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !phone ||
      !email ||
      !gender ||
      !clothingType ||
      !size ||
      !quantity ||
      !description ||
      !address ||
      !district ||
      !state ||
      !pincode ||
      !latitude ||
      !longitude
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        status: false,
        message: "Quantity must be greater than zero.",
      });
    }
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid latitude or longitude values.",
      });
    }

    // Create a new clothes donation
    const clothesDonation = new Clothsdonation({
      name,
      phone,
      email,
      gender,
      clothingType,
      size,
      quantity,
      description,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude,
    });

    // Save the clothes donation to the database
    await clothesDonation.save();
    // Send email to Dante
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to another email provider
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Clothes Donation Received",
      text: `Hello Dante,
    
          A new food donation has been created with the following details:
    
          Name: ${name}
          Phone: ${phone}
          Gender: ${gender}
          ClothingType: ${clothingType}
          Size: ${size}
          Quantity: ${quantity}
          Description: ${description}
          Address: ${address}, ${district}, ${state}, ${pincode}
    
          Thank you for your support!
    
          Best regards,
          Your Donation Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      status: true,
      message: "Clothes donation created successfully.",
    });
  } catch (error) {
    console.error("Error creating clothes donation:", error);
    return res.status(500).json({
      status: false,
      message: "Error creating clothes donation.",
      error: error.message,
    });
  }
});

export default router;
