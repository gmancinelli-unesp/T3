// frontend/src/components/Posts/PostItem.js
import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Por: {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {post.content.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/posts/${post._id}`}>
          Ler mais
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
