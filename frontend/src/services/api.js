// frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configurar token de autenticação
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Autenticação
export const register = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// Posts
export const fetchPosts = () => axios.get(`${API_URL}/posts`);
export const fetchPostById = (id) => axios.get(`${API_URL}/posts/${id}`);
export const createPost = (postData) => axios.post(`${API_URL}/posts`, postData);
export const updatePost = (id, postData) => axios.put(`${API_URL}/posts/${id}`, postData);
export const deletePost = (id) => axios.delete(`${API_URL}/posts/${id}`);

// Comentários
export const fetchComments = (postId) => axios.get(`${API_URL}/comments/post/${postId}`);
export const addComment = (commentData) => axios.post(`${API_URL}/comments`, commentData);

// Categorias e Tags
export const fetchCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (categoryData) => axios.post(`${API_URL}/categories`, categoryData);
export const fetchTags = () => axios.get(`${API_URL}/tags`);
export const createTag = (tagData) => axios.post(`${API_URL}/tags`, tagData);

export { setAuthToken };
