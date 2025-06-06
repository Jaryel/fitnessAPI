const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already registered" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed });
  res.status(201).json({ message: "Registered Successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);
  res.status(200).json({ access: token });
};

exports.details = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({ user });
};
