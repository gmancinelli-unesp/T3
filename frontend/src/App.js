// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/Posts/EditPost';
import PostDetails from './components/Posts/PostDetails';
import NotFound from './pages/NotFound';
import { setAuthToken } from './services/api';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setUser(parsedUser);
      setAuthToken(parsedUser.token);
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: 'dark', // Você pode alternar para 'dark' se preferir
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar user={user} setUser={setUser} />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails user={user} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
