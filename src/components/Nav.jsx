import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';

const pages = [ 'impressum',];
const after_login = ['Profile', 'Account', 'Dashboard', 'Logout'];
const before_login = ['Login', 'Registration'];

// let LoggedIn = sessionStorage.getItem('token') ? true : false;

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [LoggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') ? true : false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem('token') ? true : false);
  });
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userMenuItems = LoggedIn
    ? [
        <Link to={'/user/'} key="profile">
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
        </Link>,
        <Link to={'/logout/'} key="logout">
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Link>,
      ]
    : [
        <Link to={'/login/'} key="login">
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Sign In</Typography>
          </MenuItem>
        </Link>,
        <Link to={'/register/'} key="register">
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">User Registration</Typography>
          </MenuItem>
        </Link>,
      ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EduMap Chemnitz
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography href={page} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem key="direction" onClick={handleCloseNavMenu}>
                  <Typography href="/direction" textAlign="center">direction</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            to="/"
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EduMap Chemnitz
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <>
              <Button
                key={page}
                href = {page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
              <Button
              key="direction"
              href = "/direction"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              direction
            </Button>
              </>
              
              
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {LoggedIn ? (
              <Tooltip title="Open Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="../assets/avater.png" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Log in / Registration">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'warning' }}>
                  <p className="text-white text-sm font-bold mx-4">Sign in / Sign Up</p>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            )}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;