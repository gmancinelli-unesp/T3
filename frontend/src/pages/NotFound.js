// frontend/src/pages/NotFound.js
import React from 'react';
import { Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Página Não Encontrada
        </Typography>
        <Typography variant="body1" align="center">
          Volte para a <a href="/">Home</a>.
        </Typography>
      </motion.div>
    </Container>
  );
};

export default NotFound;
