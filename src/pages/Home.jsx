import { Typography, Button, Box, Container, Paper, Grid, Card, CardContent, CardMedia, Fade, Slide, useMediaQuery, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Restaurant as RestaurantIcon,
  LocalShipping as DeliveryIcon,
  AccessTime as TimeIcon,
  Favorite as FavoriteIcon,
  ArrowForward as ArrowIcon,
  AddShoppingCart as AddCartIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { menuData } from '../data/menuData';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { addToCart } = useCart();

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

  const getIsVeg = (name) => {
    const allItems = [
      ...menuData.snacks,
      ...menuData.mainCourse,
      ...menuData.beverages,
    ];
    const found = allItems.find(i => i.name === name);
    return found ? found.isVeg : undefined;
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: 'calc(100vh - 64px)',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 8, pb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: { xs: 400, md: 500 },
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
              Your one-stop solution for quick and easy food ordering at the college Canteen
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
        </Box>
      </Container>

      <Box sx={{ py: 8, bgcolor: 'background.paper', mt: 8 }}>
        <Container maxWidth="lg">
          <Fade in={true}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Today's Special
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Exclusive deals just for today
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={4}>
            {menuData.specials.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Slide direction="up" in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.name}
                      />
                      <Chip
                        label={item.tag}
                        color="error"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          fontWeight: 'bold'
                        }}
                      />
                      {typeof item.isVeg === 'boolean' && (
                        <Chip
                          label={item.isVeg ? 'Veg' : 'Non-Veg'}
                          color={item.isVeg ? 'success' : 'error'}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            fontWeight: 'bold',
                            bgcolor: item.isVeg ? 'success.main' : 'error.main',
                            color: '#fff',
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {item.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography variant="h6" color="primary">
                          ₹{item.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          ₹{item.originalPrice}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<AddCartIcon />}
                        onClick={() => {
                          addToCart(item);
                          toast.success(`${item.name} added to cart!`);
                        }}
                        sx={{
                          mt: 1,
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.05)' }
                        }}
                        fullWidth
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/menu')}
              sx={{
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            >
              View Full Menu
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ width: '100%', textAlign: 'center', py: 3, mt: 6 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            justifyContent: 'center',
            color: 'text.secondary',
          }}
        >
          <FavoriteIcon sx={{ color: '#ff9800' }} />
          Made with love for students
        </Typography>
      </Box>
    </Box>
  );
};

export default Home; 