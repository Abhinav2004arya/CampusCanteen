import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Button,
  Fade,
  Slide,
  Zoom,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ArrowBack as BackIcon,
  AccessTime as TimeIcon,
  CheckCircle as ReadyIcon,
  LocalShipping as PreparingIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Preparing':
        return <PreparingIcon />;
      case 'Ready for Pickup':
        return <ReadyIcon />;
      default:
        return <TimeIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing':
        return 'warning';
      case 'Ready for Pickup':
        return 'success';
      default:
        return 'default';
    }
  };

  if (orders.length === 0) {
    return (
      <Fade in={true}>
        <Box sx={{ width: '100vw', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <RestaurantIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No orders yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Start ordering from our menu to see your orders here
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/menu')}
              startIcon={<BackIcon />}
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              Browse Menu
            </Button>
          </Box>
        </Box>
      </Fade>
    );
  }

  const pendingAmount = orders
    .filter(order => order.paymentStatus === 'Pending')
    .reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <Box sx={{
      width: '100vw',
      px: { xs: 2, sm: 4 },
      mt: { xs: 7, sm: 8 },
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', bgcolor: 'transparent' }}>
        {pendingAmount > 0 && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(45, 45, 45, 0.8)', color: '#212121', borderRadius: 2, fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span role="img" aria-label="pending">💸</span>
            Pending Payment: ₹{pendingAmount}
          </Box>
        )}
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RestaurantIcon /> My Orders
        </Typography>
        <Box sx={{ mb: 4 }}>
          {orders.map((order, index) => (
            <Slide 
              key={order.id} 
              direction="right" 
              in={true} 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card sx={{ mb: 2, bgcolor: 'transparent' }}>
                <CardContent sx={{ bgcolor: 'transparent' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TimeIcon /> Order #{order.id.slice(-6)}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status}
                      color={getStatusColor(order.status)}
                      sx={{
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(order.timestamp).toLocaleString()}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {order.items.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography>
                        {item.name} x {item.quantity}
                      </Typography>
                      <Typography>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="primary">
                      ₹{order.total}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MyOrders; 