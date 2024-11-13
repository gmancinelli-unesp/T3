// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

// Criar nova categoria
router.post('/', protect, createCategory);

// Obter todas as categorias
router.get('/', getCategories);

module.exports = router;
