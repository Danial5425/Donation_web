import express from "express";
import {Moneydonation} from "../models/Moneydonation.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const router = express.Router();
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      amount,
      paymentMethod,
      message,
      address,
      pincode,
      latitude,
      longitude,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !amount ||
      !paymentMethod ||
      !message ||
      !address ||
      !pincode ||
      !latitude ||
      !longitude
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
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

    // Create a new money donation
    const moneyDonation = new Moneydonation({
      name,
      email,
      phone,
      amount,
      paymentMethod,
      message,
      address,
      pincode,
      latitude,
      longitude,
    });

    // Save the money donation to the database
    await moneyDonation.save();

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
      subject: "Money Donation Received",
      text: `Hello Dante,

      A new money donation has been created with the following details:

      Name: ${name}
      Phone: ${phone}
      Amount: ${amount}
      paymentMethod: ${paymentMethod}
      Address: ${address},${pincode}

      Thank you for your support!

      Best regards,
      Your Donation Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ status: true, message: "Money donation created successfully." });
  } catch (error) {
    console.error("Error creating money donation:", error);
    return res.status(500).json({
      status: false,
      message: "Error creating money donation.",
      error: error.message,
    });
  }
});

export default router;
