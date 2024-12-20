import express from "express";
import bcrypt from "bcrypt";
import { Adminuser } from "../models/Adminuser.js";
import { Ngosuser } from "../models/Ngosuser.js";
import { User } from "../models/User.js";
import  {Fooddonation}  from "../models/Fooddonation.js";
import  {Clothsdonation}  from "../models/Clothsdonation.js";
import  {Moneydonation } from "../models/Moneydonation.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Admin Signup Route
router.post("/admin-signup", async (req, res) => {
  try {
    const { username, email, password, phoneno } = req.body;

    const user = await Adminuser.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Adminuser({
      username,
      email,
      password: hashedPassword,
      phoneno,
    });

    await newUser.save();

    // Send confirmation email after signup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Admin Signup Successful',
      text: `Hello ${username},\n\nYou have successfully signed up as an admin.\n\nRegards, Your App Team.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.json({
      status: true,
      message: "Admin User created",
      data: { username, email },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Admin Login Route
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await Adminuser.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "User is not registered." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ status: false, message: "Password is incorrect." });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });

    // Set the JWT in cookies for persistent authentication
    res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true, secure: false });

    return res.json({ status: true, message: "Login successfully", token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Authentication Middleware
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

// Donors Routes
router.get("/donors", authenticateUser, async (req, res) => {
  try {
    const admin = await Adminuser.findById(req.userId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const donors = await User.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/donors/:id", authenticateUser, async (req, res) => {
  try {
    const admin = await Adminuser.findById(req.userId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const donor = await User.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json({ message: "Donor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NGOs Routes
router.get("/ngos", authenticateUser, async (req, res) => {
  try {
    const admin = await Adminuser.findById(req.userId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const ngos = await Ngosuser.find();
    res.json(ngos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/ngos/:id", authenticateUser, async (req, res) => {
  try {
    const admin = await Adminuser.findById(req.userId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const ngo = await Ngosuser.findByIdAndDelete(req.params.id);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    res.json({ message: "NGO deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Donation Routes
router.get('/clothsdonation', authenticateUser, async (req, res) => {
  const admin = await Adminuser.findById(req.userId);
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  try {
    const clothsdonation = await Clothsdonation.find();
    res.json(clothsdonation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/fooddonation', authenticateUser, async (req, res) => {
  const admin = await Adminuser.findById(req.userId);
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  try {
    const fooddonation = await Fooddonation.find();
    res.json(fooddonation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/moneydonation', authenticateUser, async (req, res) => {
  const admin = await Adminuser.findById(req.userId);
  if (!admin) return res.status(404).json({ message: "Admin not found" });
  try {
    const moneydonation = await Moneydonation.find();
    res.json(moneydonation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh Token Route
router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).send("Refresh Token Required");

  try {
    const decoded = jwt.verify(refreshToken, process.env.KEY);
    const newToken = jwt.sign({ userId: decoded.userId }, process.env.KEY, { expiresIn: "1h" });

    res.json({ status: true, message: "Token refreshed", token: newToken });
  } catch (err) {
    return res.status(403).send("Invalid refresh token");
  }
});

export default router;
