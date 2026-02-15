const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper untuk generate token 
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Web (Mapping fullName ke name) 
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ 
      fullName: name, 
      email, 
      password 
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName, 
        name: user.fullName,     
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          fullName: user.fullName, 
          name: user.fullName,    
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

// Mobile-app

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('myCourses.courseId');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile" });
  }
};

exports.updateProgress = async (req, res) => {
  const { courseId, lessonId } = req.body; 
  try {
    const user = await User.findById(req.user.id);
    const courseIndex = user.myCourses.findIndex(c => c.courseId.toString() === courseId);

    if (courseIndex > -1) {
      if (!user.myCourses[courseIndex].completedLessons.includes(lessonId)) {
        user.myCourses[courseIndex].completedLessons.push(lessonId);
      }
      
      await user.save();
      res.json({ message: "Progress updated successfully", myCourses: user.myCourses });
    } else {
      res.status(404).json({ message: "Course not found in your list" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};

exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Check Email Error:", error);
    res.status(500).json({ message: "Server error during email check" });
  }
};