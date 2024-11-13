// backend/routes/tagRoutes.js
const express = require('express');
const router = express.Router();
const { createTag, getTags } = require('../controllers/tagController');
const { protect } = require('../middleware/authMiddleware');

// Criar nova tag
router.post('/', protect, createTag);

// Obter todas as tags
router.get('/', getTags);

module.exports = router;
