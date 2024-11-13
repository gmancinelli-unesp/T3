// backend/controllers/categoryController.js
const Category = require('../models/Category');

// Criar nova categoria
const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(400).json({ message: 'Categoria já existe' });
    }

    const category = new Category({ name });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    console.error('Erro ao criar categoria:', error.message);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

// Obter todas as categorias
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Erro ao obter categorias:', error.message);
    res.status(500).json({ message: 'Erro ao obter categorias' });
  }
};

module.exports = { createCategory, getCategories };
