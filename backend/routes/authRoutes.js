const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');

// URL: /api/auth/register
router.post('/register', registerUser);

// URL: /api/auth/login
router.post('/login', loginUser);

// URL: /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

module.exports = router;