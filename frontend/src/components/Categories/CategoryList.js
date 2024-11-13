// frontend/src/components/Categories/CategoryList.js
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/api';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const { data } = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Categorias
        </Typography>
        <List>
          {categories.map((cat) => (
            <ListItem key={cat._id} disablePadding>
              <ListItemText
                primary={
                  <Link to={`/?category=${cat._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {cat.name}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </motion.div>
  );
};

export default CategoryList;
