// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import { login, setAuthToken } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setAuthToken(data.token);
      setUser(data);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no login');
      toast.error(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Entrar
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </Typography>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
