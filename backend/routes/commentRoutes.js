// backend/routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const { addComment, getCommentsByPost } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Adicionar comentário
router.post('/', protect, addComment);

// Obter comentários de um post
router.get('/post/:postId', getCommentsByPost);

module.exports = router;
