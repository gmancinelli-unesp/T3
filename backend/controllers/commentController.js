// backend/controllers/commentController.js
const Comment = require('../models/Comment');

// Adicionar comentário
const addComment = async (req, res) => {
  const { content, postId } = req.body;

  try {
    const comment = new Comment({
      content,
      post: postId,
      author: req.user._id,
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error.message);
    res.status(500).json({ message: 'Erro ao adicionar comentário' });
  }
};

// Obter comentários de um post
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error('Erro ao obter comentários:', error.message);
    res.status(500).json({ message: 'Erro ao obter comentários' });
  }
};

module.exports = { addComment, getCommentsByPost };
