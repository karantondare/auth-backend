import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { loginValidation, registerValidation } from "../validation.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await UserModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({
      userId: user._id,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("Email and/or password doesn't match.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  // res.send("Logged In");
});

export default router;
