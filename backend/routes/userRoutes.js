const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateProgress, 
  checkEmail, 
  loginUser,      
  registerUser    
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// ENDPOINT UNTUK AUTH (Web & Mobile) 

// URL: /api/user/register
router.post('/register', registerUser); 

// URL: /api/user/login
router.post('/login', loginUser); 

// ENDPOINT EXIST

// URL: /api/user/profile (Harus Login)
router.get('/profile', protect, getUserProfile);

// URL: /api/user/progress 
router.patch('/progress', protect, updateProgress);

// Forgot Password 
router.post('/check-email', checkEmail); 

module.exports = router;