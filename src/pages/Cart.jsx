import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Fade,
  Zoom,
  Slide,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { 
  Add, 
  Remove, 
  Delete, 
  ShoppingCart as CartIcon,
  ArrowBack as BackIcon,
  CheckCircle as CheckIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentOption, setPaymentOption] = useState('now');

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setShowPaymentDialog(true);
  };

  const handleConfirmPayment = () => {
    const order = {
      id: Date.now().toString(),
      items: cartItems,
      total: getTotalPrice(),
      status: 'Preparing',
      timestamp: new Date().toISOString(),
      paymentStatus: paymentOption === 'later' ? 'Pending' : 'Paid',
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [order, ...existingOrders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    clearCart();
    toast.success('Order placed successfully!');
    setShowPaymentDialog(false);
    setPaymentOption('now');
    navigate('/my-orders');
  };

  if (cartItems.length === 0) {
    return (
      <Fade in={true}>
        <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/menu')}
              sx={{ mt: 2 }}
              startIcon={<BackIcon />}
            >
              Browse Menu
            </Button>
          </Box>
        </Box>
      </Fade>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 4 }, overflow: 'hidden', mt: { xs: 7, sm: 8 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: { xs: 2, sm: 3 }
          }}
        >
          <CartIcon /> Your Cart
        </Typography>
        <Box sx={{ mb: 4 }}>
          {cartItems.map((item, index) => (
            <Slide 
              key={item.id} 
              direction="right" 
              in={true} 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card sx={{ mb: 2 }}>
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 1, sm: 0 }
                  }}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                      >
                        {item.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                      >
                        ₹{item.price} x {item.quantity}
                      </Typography>
                      {item.customization && (
                        <Box sx={{ mt: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                          >
                            Spice Level: {item.customization.spiceLevel}
                          </Typography>
                          {item.customization.specialInstructions && (
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                            >
                              Special Instructions: {item.customization.specialInstructions}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      alignSelf: { xs: 'flex-end', sm: 'center' }
                    }}>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        size="small"
                        sx={{
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.1)' }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        size="small"
                        sx={{
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.1)' }
                        }}
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        color="error"
                        sx={{ 
                          ml: 2,
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.1)' }
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          ))}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="h5" 
            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
          >
            Total:
          </Typography>
          <Typography 
            variant="h5" 
            color="primary"
            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
          >
            ₹{getTotalPrice()}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/menu')}
            startIcon={<BackIcon />}
            fullWidth={useMediaQuery(theme.breakpoints.down('sm'))}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            size="large"
            startIcon={<CheckIcon />}
            fullWidth={useMediaQuery(theme.breakpoints.down('sm'))}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
      <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)}>
        <DialogTitle>Choose Payment Option</DialogTitle>
        <DialogContent>
          <RadioGroup
            value={paymentOption}
            onChange={e => setPaymentOption(e.target.value)}
          >
            <FormControlLabel value="now" control={<Radio />} label="Pay Now" />
            <FormControlLabel value="later" control={<Radio />} label="Pay Later" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmPayment} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart; 