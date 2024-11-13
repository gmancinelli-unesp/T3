// frontend/src/components/Posts/CreatePost.js
import React, { useState, useEffect } from 'react';
import { createPost, fetchCategories, fetchTags } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const loadCategories = async () => {
    try {
      const { data } = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar categorias', error);
    }
  };

  const loadTags = async () => {
    try {
      const { data } = await fetchTags();
      setTags(data);
    } catch (error) {
      console.error('Erro ao carregar tags', error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, categories: selectedCategories, tags: selectedTags });
      toast.success('Post criado com sucesso!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar post');
      toast.error(err.response?.data?.message || 'Erro ao criar post');
    }
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Criar Novo Post
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Conteúdo"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Categorias</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Categorias" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const category = categories.find((cat) => cat._id === id);
                      return <Chip key={id} label={category ? category.name : id} />;
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={selectedTags}
                onChange={handleTagChange}
                input={<OutlinedInput label="Tags" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((id) => {
                      const tag = tags.find((t) => t._id === id);
                      return <Chip key={id} label={tag ? tag.name : id} />;
                    })}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag._id} value={tag._id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Publicar
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreatePost;
