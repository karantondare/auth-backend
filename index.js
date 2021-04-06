import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
dotenv.config();

mongoose.connect(
  process.env.CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to the database")
);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(3100, () => console.log("server running on port 3100"));
