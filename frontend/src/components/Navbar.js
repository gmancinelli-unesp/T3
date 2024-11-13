// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Definindo os itens do menu como arrays
  const menuItems = user
    ? [
        <MenuItem key="dashboard" component={Link} to="/dashboard" onClick={handleClose}>
          Dashboard
        </MenuItem>,
        <MenuItem key="logout" onClick={() => { handleLogout(); handleClose(); }}>
          Logout
        </MenuItem>,
      ]
    : [
        <MenuItem key="login" component={Link} to="/login" onClick={handleClose}>
          Login
        </MenuItem>,
        <MenuItem key="register" component={Link} to="/register" onClick={handleClose}>
          Register
        </MenuItem>,
      ];

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo ou Título */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
            Sistema de Blog
          </Button>
        </Typography>
        {/* Menu Responsivo */}
        <div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {menuItems}
          </Menu>
        </div>
        {/* Botões para telas maiores */}
        <div className="desktop-menu">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
