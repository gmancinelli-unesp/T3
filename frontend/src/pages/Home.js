// frontend/src/pages/Home.js
import React from 'react';
import PostList from '../components/Posts/PostList';
import CategoryList from '../components/Categories/CategoryList';
import TagList from '../components/Tags/TagList';
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <PostList />
      </Grid>
      <Grid item xs={12} md={4}>
        <CategoryList />
        <TagList />
      </Grid>
    </Grid>
  );
};

export default Home;
