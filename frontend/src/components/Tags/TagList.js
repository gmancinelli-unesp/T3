// frontend/src/components/Tags/TagList.js
import React, { useEffect, useState } from 'react';
import { fetchTags } from '../../services/api';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const TagList = () => {
  const [tags, setTags] = useState([]);

  const loadTags = async () => {
    try {
      const { data } = await fetchTags();
      setTags(data);
    } catch (error) {
      console.error('Erro ao carregar tags', error);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>
        <List>
          {tags.map((tag) => (
            <ListItem key={tag._id} disablePadding>
              <ListItemText
                primary={
                  <Link to={`/?tag=${tag._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {tag.name}
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

export default TagList;
