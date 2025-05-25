import { Typography, Button, Box, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Restaurant as RestaurantIcon,
  LocalShipping as DeliveryIcon,
  AccessTime as TimeIcon,
  Favorite as FavoriteIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'Fresh Food',
      description: 'Delicious meals prepared with fresh ingredients'
    },
    {
      icon: <DeliveryIcon sx={{ fontSize: 40 }} />,
      title: 'Quick Delivery',
      description: 'Fast and reliable delivery to your location'
    },
    {
      icon: <TimeIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Service',
      description: 'Order anytime, anywhere'
    }
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: { xs: 2, sm: 4 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #ff9800 30%, #ff5722 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to CampusCanteen
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography 
              variant="h5" 
              color="text.secondary" 
              paragraph
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              Your one-stop solution for quick and easy food ordering at the college cafeteria
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={{ mb: 8 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/menu')}
              sx={{ 
                mr: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #ff9800 30%, #ff5722 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff5722 30%, #ff9800 90%)',
                },
              }}
              endIcon={<ArrowIcon />}
            >
              View Menu
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/my-orders')}
              sx={{ 
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderColor: '#ff9800',
                color: '#ff9800',
                '&:hover': {
                  borderColor: '#ff5722',
                  color: '#ff5722',
                  backgroundColor: 'rgba(255, 152, 0, 0.04)',
                },
              }}
            >
              My Orders
            </Button>
          </MotionBox>

          <Grid container spacing={4} sx={{ mt: 4, width: '100%' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  elevation={3}
                  sx={{
                    p: 4,
                    minWidth: 280,
                    minHeight: 260,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            sx={{ mt: 8 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: 'text.secondary',
              }}
            >
              <FavoriteIcon sx={{ color: '#ff9800' }} />
              Made with love for students
            </Typography>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 