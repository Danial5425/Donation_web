import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import donateRoutes from "./routes/donate.js";
import ngosuserRoutes from "./routes/ngosuser.js";
import fooddonationRoutes from "./routes/fooddonation.js";
import clothsdonationRoutes from "./routes/clothsdonation.js";
import moneydonationRoutes from "./routes/moneydonation.js";
import adminuserRoutes  from "./routes/adminuser.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/donate", donateRoutes);
app.use("/auth", userRoutes);
app.use("/ngosuser", ngosuserRoutes);
app.use("/fooddonation", fooddonationRoutes);
app.use("/clothsdonation",clothsdonationRoutes)
app.use("/moneydonation",moneydonationRoutes)
app.use("/admin",adminuserRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

export default app;
