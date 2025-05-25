import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{
      background: 'rgba(33,33,33,0.7)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
      color: 'primary.main',
    }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#ff9800', fontWeight: 700 }}>
            CampusCanteen
          </Link>
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton 
              onClick={() => navigate('/cart')}
              sx={{ color: '#ff9800' }}
            >
              <Badge badgeContent={cartItems.length} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff9800', color: '#212121' } }}>
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ color: '#ff9800' }}
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
              <MenuItem onClick={() => handleNavigation('/menu')}>Menu</MenuItem>
              <MenuItem onClick={() => handleNavigation('/my-orders')}>My Orders</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/menu" sx={{ color: '#ff9800', fontWeight: 600 }}>
              Menu
            </Button>
            <Button color="inherit" component={Link} to="/my-orders" sx={{ color: '#ff9800', fontWeight: 600 }}>
              My Orders
            </Button>
            <IconButton 
              onClick={() => navigate('/cart')}
              sx={{ ml: 2, color: '#ff9800' }}
            >
              <Badge badgeContent={cartItems.length} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff9800', color: '#212121' } }}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 