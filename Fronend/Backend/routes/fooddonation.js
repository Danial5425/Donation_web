import express from "express";
import {Fooddonation }from "../models/Fooddonation.js";
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
      foodType,
      quantity,
      packaging,
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
      !foodType ||
      !quantity ||
      !packaging ||
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

    // Validate latitude and longitude
    if (
      latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid latitude or longitude values.",
      });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Quantity must be greater than zero.",
        });
    }

    // Create a new food donation
    const foodDonation = new Fooddonation({
      name,
      phone,
      email,
      foodType,
      quantity,
      packaging,
      description,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude,
    });

    // Save the food donation to the database
    await foodDonation.save();

    // Send email to user
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
      subject: "Food Donation Received",
      text: `Hello Dante,

      A new food donation has been created with the following details:

      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Food Type: ${foodType}
      Quantity: ${quantity}
      Packaging: ${packaging}
      Description: ${description || "No description provided"}
      Address: ${address}, ${district}, ${state}, ${pincode}

      Thank you for your support!

      Best regards,
      Your Donation Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ status: true, message: "Food donation created successfully." });
  } catch (error) {
    console.error("Error creating food donation:", error);
    return res
      .status(500)
      .json({
        status: false,
        message: "Error creating food donation.",
        error: error.message,
      });
  }
});

export default router;
