import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Donate from "../models/Donate.js"; // This should match the default export

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    name,
    phoneno,
    type_of_donation,
    quantity,
    address,
    district,
    state,
    pincode,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !phoneno ||
    !type_of_donation ||
    !quantity ||
    !address ||
    !district ||
    !state ||
    !pincode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newDonate = new Donate({
      name,
      phoneno,
      type_of_donation,
      quantity,
      address,
      district,
      state,
      pincode,
    });

    await newDonate.save();
    res
      .status(201)
      .json({ status: true, message: "Donation added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});
// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1] || req.cookies.jwt;
//   if (!token) {
//     return res.status(401).send("Access Denied");
//   }

//   jwt.verify(token, process.env.KEY, (err, decoded) => {
//     if (err) return res.status(403).send("Invalid token");
//     req.userId = decoded.userId;
//     next();
//   });
// };





export default router;
