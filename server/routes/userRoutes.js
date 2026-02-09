const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hashed
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
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
