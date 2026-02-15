const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ fullName, email, password });
    res.status(201).json({ _id: user._id, fullName: user.fullName, email: user.email, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: "Registration failed: " + error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ _id: user._id, fullName: user.fullName, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Logika Forgot Password (Simulasi)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Biasanya untuk kirim email, untuk tugas hanya mengirim respon sukses saja
    res.json({ message: "Verification code sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending code" });
  }
};