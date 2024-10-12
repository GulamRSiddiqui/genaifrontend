// src/components/MenuBar.js
import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext, {useAuthContext} from '../context/AuthContext';
import LocationComponent from './LocationComponent';

const MenuBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logoutUser } = useAuthContext();
  const usr=useContext(AuthContext);
  
useEffect(() => { 
  // const usr=useContext(AuthContext);
  alert(`000000 this is form MenuBar Page ${user} ${usr}`);
  console.log(user);
  if(!user) {
    logoutUser();
  }
}, [user]);


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {user ? `- ${user.email}` : ''} Gen AI Django Backend and React Frontend App
        </Typography>
        {user ? (
          <>
          <Typography color="inherit">
            {user.email}
          </Typography>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', textDecorationColor:'whitesmoke' }}>
            <Button color="inherit" sx={{ color: 'white' }}>
              Login
            </Button>
          </Link>
        )}
        <Link to="/Register" style={{ textDecoration: 'none', textDecorationColor:'whitesmoke' }}>
        <Button color="inherit" sx={{ color: 'white' }}>
          Register
        </Button>
        </Link>
        <LocationComponent  />
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
        <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
        <MenuItem component={Link} to="/Upload" onClick={handleMenuClose}>Upload</MenuItem>
        <MenuItem component={Link} to="/Question Answer" onClick={handleMenuClose}>Question Answer</MenuItem>
        <MenuItem component={Link} to="/User Management" onClick={handleMenuClose}>User Management</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default MenuBar;
