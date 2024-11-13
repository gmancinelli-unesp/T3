// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

// Registrar novo usuário
router.post('/register', registerUser);

// Login de usuário
router.post('/login', authUser);

module.exports = router;
