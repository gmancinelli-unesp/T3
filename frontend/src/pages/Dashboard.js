// frontend/src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/Posts/PostList';
import { Button, Typography, Box } from '@mui/material';

const Dashboard = ({ user }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Bem-vindo, {user.name}!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create"
        sx={{ mb: 3 }}
      >
        Criar Novo Post
      </Button>
      <PostList />
    </Box>
  );
};

export default Dashboard;
