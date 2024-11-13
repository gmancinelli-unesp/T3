// backend/controllers/postController.js
const Post = require('../models/Post');

// Criar novo post
const createPost = async (req, res) => {
  const { title, content, categories, tags } = req.body;

  try {
    const post = new Post({
      title,
      content,
      author: req.user._id,
      categories,
      tags,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.error('Erro ao criar post:', error.message);
    res.status(500).json({ message: 'Erro ao criar o post' });
  }
};

// Obter todos os posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .populate('categories', 'name')
      .populate('tags', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Erro ao obter posts:', error.message);
    res.status(500).json({ message: 'Erro ao obter os posts' });
  }
};

// Obter um post por ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('categories', 'name')
      .populate('tags', 'name');

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter post:', error.message);
    res.status(500).json({ message: 'Erro ao obter o post' });
  }
};

// Atualizar um post
const updatePost = async (req, res) => {
  const { title, content, categories, tags } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      post.title = title || post.title;
      post.content = content || post.content;
      post.categories = categories || post.categories;
      post.tags = tags || post.tags;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar post:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar o post' });
  }
};

// Deletar um post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      await post.remove();
      res.json({ message: 'Post removido' });
    } else {
      res.status(404).json({ message: 'Post não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar post:', error.message);
    res.status(500).json({ message: 'Erro ao deletar o post' });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
