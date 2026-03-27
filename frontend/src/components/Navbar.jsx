import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/feed" 
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: '900', letterSpacing: '-0.5px' }}
        >
          TaskPlanet Social
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          {currentUser ? (
            <>
              <Button component={Link} to="/feed" color="inherit">Feed</Button>
              <Button component={Link} to="/create" color="inherit">Create Post</Button>
              <Typography variant="body2" sx={{ fontWeight: 800, mx: 1 }}>
                {currentUser.username}
              </Typography>
              <Button onClick={handleLogout} variant="outlined" size="small">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/feed" color="inherit">Global Feed</Button>
              <Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/signup" variant="contained" size="small" disableElevation>
                Sign Up
              </Button>
            </>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {currentUser ? [
              <MenuItem key="feed" component={Link} to="/feed" onClick={handleClose} sx={{fontWeight: 600}}>Feed</MenuItem>,
              <MenuItem key="create" component={Link} to="/create" onClick={handleClose} sx={{fontWeight: 600}}>Create Post</MenuItem>,
              <MenuItem key="user" disabled sx={{ fontWeight: 800, color: '#0A0A0A', opacity: 1 }}>{currentUser.username}</MenuItem>,
              <MenuItem key="logout" onClick={handleLogout} sx={{fontWeight: 600}}>Logout</MenuItem>
            ] : [
              <MenuItem key="feed" component={Link} to="/feed" onClick={handleClose} sx={{fontWeight: 600}}>Global Feed</MenuItem>,
              <MenuItem key="login" component={Link} to="/login" onClick={handleClose} sx={{fontWeight: 600}}>Login</MenuItem>,
              <MenuItem key="signup" component={Link} to="/signup" onClick={handleClose} sx={{fontWeight: 600}}>Sign Up</MenuItem>
            ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;