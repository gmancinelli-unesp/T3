// backend/controllers/tagController.js
const Tag = require('../models/Tag');

// Criar nova tag
const createTag = async (req, res) => {
  const { name } = req.body;

  try {
    const tagExists = await Tag.findOne({ name });

    if (tagExists) {
      return res.status(400).json({ message: 'Tag já existe' });
    }

    const tag = new Tag({ name });
    const createdTag = await tag.save();
    res.status(201).json(createdTag);
  } catch (error) {
    console.error('Erro ao criar tag:', error.message);
    res.status(500).json({ message: 'Erro ao criar tag' });
  }
};

// Obter todas as tags
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    console.error('Erro ao obter tags:', error.message);
    res.status(500).json({ message: 'Erro ao obter tags' });
  }
};

module.exports = { createTag, getTags };
