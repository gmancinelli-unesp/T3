// frontend/src/components/Posts/PostDetails.js
import React, { useEffect, useState } from 'react';
import { fetchPostById, deletePost, fetchComments, addComment } from '../../services/api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CommentList from '../Comments/CommentList';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const PostDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');

  const loadPost = async () => {
    try {
      const { data } = await fetchPostById(id);
      setPost(data);
    } catch (error) {
      console.error('Erro ao carregar post', error);
      toast.error('Erro ao carregar post.');
    }
  };

  const loadComments = async () => {
    try {
      const { data } = await fetchComments(id);
      setComments(data);
    } catch (error) {
      console.error('Erro ao carregar comentários', error);
      toast.error('Erro ao carregar comentários.');
    }
  };

  useEffect(() => {
    loadPost();
    loadComments();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar este post?')) {
      try {
        await deletePost(id);
        toast.success('Post deletado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro ao deletar post:', error);
        toast.error('Erro ao deletar post.');
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    try {
      await addComment({ content: commentContent, postId: id });
      setCommentContent('');
      loadComments();
      toast.success('Comentário adicionado!');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao adicionar comentário');
      toast.error(err.response?.data?.message || 'Erro ao adicionar comentário');
    }
  };

  if (!post)
    return (
      <Grid container justifyContent="center">
        <Typography variant="h6">Carregando post...</Typography>
      </Grid>
    );

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Por: {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {post.content}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" component="span" sx={{ mr: 1 }}>
              Categorias:
            </Typography>
            {post.categories.map((cat) => (
              <Button
                key={cat._id}
                variant="outlined"
                size="small"
                component={Link}
                to={`/?category=${cat._id}`}
                sx={{ mr: 1, mb: 1 }}
              >
                {cat.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" component="span" sx={{ mr: 1 }}>
              Tags:
            </Typography>
            {post.tags.map((tag) => (
              <Button
                key={tag._id}
                variant="outlined"
                size="small"
                component={Link}
                to={`/?tag=${tag._id}`}
                sx={{ mr: 1, mb: 1 }}
              >
                {tag.name}
              </Button>
            ))}
          </Box>
          {user && user._id === post.author._id && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/edit/${post._id}`}
                sx={{ mr: 2 }}
              >
                Editar
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Deletar
              </Button>
            </Box>
          )}
        </Paper>
      </motion.div>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Comentários
        </Typography>
        <CommentList comments={comments} />
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper elevation={2} sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h6" gutterBottom>
                Adicionar Comentário
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <Box component="form" onSubmit={handleAddComment} sx={{ mt: 2 }}>
                <TextField
                  label="Seu Comentário"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Adicionar
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <Link to="/login">Faça login</Link> para adicionar um comentário.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PostDetails;
