import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT for token creation
import { Ngosuser } from "../models/Ngosuser.js";
import Donate from "../models/Donate.js";
import {Fooddonation} from "../models/Fooddonation.js";
import {Clothsdonation} from "../models/Clothsdonation.js";
import {Moneydonation } from "../models/Moneydonation.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const router = express.Router();

// NGO Signup Route
router.post("/", async (req, res) => {
  try {
    const {
      username,
      organizationName,
      email,
      password,
      phoneno,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude,
    } = req.body;

    // Validate required fields
    if (
      !username ||
      !organizationName ||
      !email ||
      !password ||
      !phoneno ||
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

    // Check if a user with this email already exists
    const existingUser = await Ngosuser.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new NGO user
    const newNgos = new Ngosuser({
      username,
      organizationName,
      email,
      password: hashedPassword,
      phoneno,
      address,
      district,
      state,
      pincode,
      latitude,
      longitude,
    });

    // Save the new NGO user to the database
    await newNgos.save();

    // Return success message
    return res.json({ status: true, message: "NGO created successfully." });
  } catch (err) {
    console.error("Error creating NGO user:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error." });
  }
});

// NGO Login Route
router.post("/ngoslogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Ngosuser.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User is not registered." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Password is incorrect." });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });

    // Set cookie with JWT
    res.cookie("jwt", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
    });
    return res.json({ status: true, message: "Login successfully.", token });
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error." });
  }
});
// Assuming you have User and NgoUser models with a 'role' field

// Middleware to authenticate user via JWT
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.userId = decoded.userId;
    next();
  });
};

// Route to fetch NGO profile
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const ngoUser = await Ngosuser.findById(req.userId);
    if (!ngoUser) return res.status(404).json({ message: "NGO not found" });

    res.json({
      username: ngoUser.username,
      organizationName: ngoUser.organizationName,
      phoneno: ngoUser.phoneno,
      address: ngoUser.address,
      district: ngoUser.district,
      state: ngoUser.state,
      pincode: ngoUser.pincode,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

// Route to update NGO profile
router.patch("/edit-profile", authenticateUser, async (req, res) => {
  const {
    username,
    organizationName,
    phoneno,
    address,
    district,
    state,
    pincode,
  } = req.body;

  try {
    const ngoUser = await Ngosuser.findById(req.userId);
    if (!ngoUser)
      return res.status(404).json({ message: "NGO user not found" });

    ngoUser.username = username;
    ngoUser.organizationName = organizationName;
    ngoUser.phoneno = phoneno;
    ngoUser.address = address;
    ngoUser.district = district;
    ngoUser.state = state;
    ngoUser.pincode = pincode;

    await ngoUser.save();
    res.status(200).json({ message: "Profile updated successfully", ngoUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
});
router.get("/donations", authenticateUser, async (req, res) => {
  try {
    const ngoUser = await Ngosuser.findById(req.userId);
    if (!ngoUser) return res.status(404).json({ message: "NGO not found" });

    const donations = await Donate.find({
      pincode: ngoUser.pincode, // Match the donation pincode with the NGO's pincode
    });

    res.json(donations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching donations", error: error.message });
  }
});

router.patch("/donations/:donationId", async (req, res) => {
  const { donationId } = req.params; // Get the donation ID from the URL params
  const { status, Collectedby } = req.body; // Get status and Collectedby from the request body
  // Validate input
  if (!status || !Collectedby) {
    return res
      .status(400)
      .json({ message: "Status and Collectedby are required." });
  }

  try {
    // Find the donation by its ID
    const donation = await Donate.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    // Update the donation status and Collectedby
    donation.status = status;
    donation.Collectedby = Collectedby;

    // Save the updated donation
    await donation.save();

    // Return the updated donation
    res.status(200).json({
      message: "Donation status updated successfully.",
      donation,
    });
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({ message: "Server error" });
  }
});
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const toRad = (deg) => deg * (Math.PI / 180); // Convert degrees to radians

  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

const fetchDonationsByType = async (DonationModel, req, res) => {
  try {
    // Fetch the NGO user based on the authenticated user's ID
    const ngoUser = await Ngosuser.findById(req.userId);
    if (!ngoUser) return res.status(404).json({ message: "NGO not found" });

    // Get all donations
    const donations = await DonationModel.find();

    // Filter donations by checking distance from NGO's location
    const nearbyDonations = donations.filter((donation) => {
      // Assuming donation has latitude and longitude
      const donationLat = donation.latitude;
      const donationLon = donation.longitude;

      // Calculate the distance between the NGO and the donation
      const distance = haversineDistance(
        ngoUser.latitude,
        ngoUser.longitude,
        donationLat,
        donationLon
      );

      // Check if the donation is within a 10 km radius
      return distance <= 10;
    });

    // Return only donations within the 5 km radius
    res.json(nearbyDonations);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching ${DonationModel.modelName.toLowerCase()} donations`,
      error: error.message,
    });
  }
};

// Helper function to update donation status by type
const updateDonationStatus = async (DonationModel, donationId, req, res) => {
  const { status, Collectedby } = req.body;

  if (!status || !Collectedby) {
    return res
      .status(400)
      .json({ message: "Status and Collectedby are required." });
  }

  try {
    const donation = await DonationModel.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    donation.status = status;
    donation.Collectedby = Collectedby;

    const email = donation.email; // Ensure email exists in the schema
    if (!email) {
      return res
        .status(400)
        .json({ message: "Recipient email is not defined." });
    }

    await donation.save();

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
      subject: " Donation Received",
      text: `Hello donors

        donation is status = ${status};
        donation is Collectedby = ${Collectedby};
    
      
  
        Thank you for your support!
  
        Best regards,
        Your Donation Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Donation status updated successfully.",
      donation,
    });
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Routes for fetching and updating donations

// Food donations routes
router.get("/fooddonations", authenticateUser, (req, res) =>
  fetchDonationsByType(Fooddonation, req, res)
);
router.patch("/fooddonations/:fooddonationId", (req, res) =>
  updateDonationStatus(Fooddonation, req.params.fooddonationId, req, res)
);

// Clothes donations routes
router.get("/clothsdonations", authenticateUser, (req, res) =>
  fetchDonationsByType(Clothsdonation, req, res)
);
router.patch("/clothsdonations/:clothsdonationId", (req, res) =>
  updateDonationStatus(Clothsdonation, req.params.clothsdonationId, req, res)
);

// Money donations routes
router.get("/moneydonations", authenticateUser, (req, res) =>
  fetchDonationsByType(Moneydonation, req, res)
);
router.patch("/moneydonations/:moneydonationId", (req, res) =>
  updateDonationStatus(Moneydonation, req.params.moneydonationId, req, res)
);

export default router;
