
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/auth/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hashed
  });

  res.json(user);
});

router.post("/auth/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const match = await bcrypt.compare(
    req.body.password,
    user.password
  );

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secret"
  );

  res.json({ token });
});

export default router;
