// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Obter todos os posts
router.get('/', getPosts);

// Obter um post por ID
router.get('/:id', getPostById);

// Criar um novo post
router.post('/', protect, createPost);

// Atualizar um post
router.put('/:id', protect, updatePost);

// Deletar um post
router.delete('/:id', protect, deletePost);

module.exports = router;
