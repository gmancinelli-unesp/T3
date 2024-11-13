// frontend/src/components/Comments/CommentList.js
import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CommentList = ({ comments }) => {
  if (comments.length === 0) return <Typography variant="body1">Nenhum comentário ainda.</Typography>;

  return (
    <List>
      {comments.map((comment) => (
        <motion.div
          key={comment._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <>
                  <Typography variant="subtitle1" component="span">
                    {comment.author.name}
                  </Typography>
                  {' — '}
                  <Typography variant="caption" component="span" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </>
              }
              secondary={
                <Typography variant="body2" color="text.primary">
                  {comment.content}
                </Typography>
              }
            />
          </ListItem>
          <Divider component="li" />
        </motion.div>
      ))}
    </List>
  );
};

export default CommentList;
