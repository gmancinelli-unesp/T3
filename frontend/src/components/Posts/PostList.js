// frontend/src/components/Posts/PostList.js
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import PostItem from './PostItem';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const { data } = await fetchPosts();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar posts', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading)
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      {posts.length === 0 ? (
        <Typography variant="body1">Nenhum post encontrado.</Typography>
      ) : (
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} md={6} key={post._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostItem post={post} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default PostList;
