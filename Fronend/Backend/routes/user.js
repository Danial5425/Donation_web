import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({ status: true, message: "User created" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User is not registered");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Password is incorrect");
  }

  const token = jwt.sign({ userId: user._id }, process.env.KEY, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true, secure: false });
  return res.json({ status: true, message: "Login successfully", token });
  
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User is not registered");
    }

    const token = jwt.sign({ _id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: false, message: "Something went wrong" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const userId = decoded._id;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res.json({ status: true, message: "Password reset successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.json({ status: false, message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.json({ status: false, message: "Invalid token" });
    }
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
});

// Middleware to verify user token
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    const decoded = await jwt.verify(token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};

// Verify User Endpoint
router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "User verified", user: req.user });
});

// User Logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, secure: false });
    return res.json({ status: true, message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Error during logout" });
  }
});




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

// Route to fetch user profile
router.get("/user/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      fullName: user.fullName,
      email: user.email,
      dateOfBirth: user.dateOfBirth, // Include this field if available
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

// Route to update user profile
router.patch("/edit-profile", authenticateUser, async (req, res) => {
  const { fullName, phoneNumber, address, city, state, pincode } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = fullName || user.fullName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.pincode = pincode || user.pincode;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
});




export default router;
