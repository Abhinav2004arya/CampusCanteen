import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Tabs,
  Tab,
  Chip,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  FormGroup,
  Checkbox,
  Slider,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { 
  Search as SearchIcon,
  AddShoppingCart as AddCartIcon,
  Restaurant as RestaurantIcon,
  LocalCafe as BeverageIcon,
  Fastfood as SnackIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { menuData } from '../data/menuData';
import { toast } from 'react-toastify';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('snacks');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [customization, setCustomization] = useState({
    spiceLevel: 'medium',
    specialInstructions: '',
  });
  const { addToCart } = useCart();
  const [vegFilter, setVegFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('default');

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleAddToCartClick = (item) => {
    setSelectedItem(item);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
    setSelectedItem(null);
  };

  const handleAddWithoutCustomization = () => {
    if (selectedItem) {
      addToCart(selectedItem);
      toast.success(`${selectedItem.name} added to cart!`);
      handleCloseConfirmDialog();
    }
  };

  const handleOpenCustomization = () => {
    setShowConfirmDialog(false);
    setCustomization({
      spiceLevel: 'medium',
      specialInstructions: '',
    });
  };

  const handleCloseCustomization = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      const customizedItem = {
        ...selectedItem,
        customization,
      };
      addToCart(customizedItem);
      toast.success(`${selectedItem.name} added to cart!`);
      handleCloseCustomization();
    }
  };

  const handleSpiceLevelChange = (event) => {
    setCustomization({
      ...customization,
      spiceLevel: event.target.value,
    });
  };

  const handleSpecialInstructionsChange = (event) => {
    setCustomization({
      ...customization,
      specialInstructions: event.target.value,
    });
  };

  const allItems = [
    ...menuData.snacks,
    ...menuData.mainCourse,
    ...menuData.beverages,
  ];
  const minPrice = Math.min(...allItems.map(i => i.price));
  const maxPrice = Math.max(...allItems.map(i => i.price));

  let filteredItems = menuData[selectedCategory].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (vegFilter !== 'all') {
    filteredItems = filteredItems.filter(item =>
      vegFilter === 'veg' ? item.isVeg : !item.isVeg
    );
  }
  filteredItems = filteredItems.filter(item =>
    item.price >= priceRange[0] && item.price <= priceRange[1]
  );
  if (sortBy === 'priceLowHigh') filteredItems.sort((a, b) => a.price - b.price);
  if (sortBy === 'priceHighLow') filteredItems.sort((a, b) => b.price - a.price);
  if (sortBy === 'nameAZ') filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === 'nameZA') filteredItems.sort((a, b) => b.name.localeCompare(a.name));

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'snacks':
        return <SnackIcon />;
      case 'mainCourse':
        return <RestaurantIcon />;
      case 'beverages':
        return <BeverageIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      width: '100vw', 
      px: { xs: 2, sm: 4 }, 
      mt: { xs: 7, sm: 8 },
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
    }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{
          minWidth: { md: 260 },
          maxWidth: { md: 300 },
          flex: { md: '0 0 260px' },
          mb: { xs: 2, md: 0 },
          position: { md: 'sticky' },
          top: { md: 96 },
          alignSelf: 'flex-start',
          bgcolor: 'rgba(45, 45, 45, 0.8)',
          borderRadius: { md: 3 },
          p: { md: 3, xs: 0 },
          boxShadow: { md: 2, xs: 0 },
          zIndex: 1,
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', display: { xs: 'none', md: 'block' } }}>
            Filters
          </Typography>
          <FormGroup row={false} sx={{ mb: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={vegFilter === 'veg'} onChange={() => setVegFilter(vegFilter === 'veg' ? 'all' : 'veg')} color="success" />}
              label="Veg"
            />
            <FormControlLabel
              control={<Checkbox checked={vegFilter === 'nonveg'} onChange={() => setVegFilter(vegFilter === 'nonveg' ? 'all' : 'nonveg')} color="error" />}
              label="Non-Veg"
            />
          </FormGroup>
          <Box sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel shrink>Price Range</InputLabel>
            <Slider
              value={priceRange}
              onChange={(_, v) => setPriceRange(v)}
              valueLabelDisplay="auto"
              min={minPrice}
              max={maxPrice}
              step={1}
              sx={{ width: '90%' }}
            />
          </Box>
          <Box sx={{ minWidth: 180 }}>
            <InputLabel shrink>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              size="small"
              displayEmpty
              sx={{ width: '90%' }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
              <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
              <MenuItem value="nameAZ">Name: A-Z</MenuItem>
              <MenuItem value="nameZA">Name: Z-A</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ flex: 1, bgcolor: 'transparent' }}>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Search Menu"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            <Tabs
              value={selectedCategory}
              onChange={handleCategoryChange}
              centered
              sx={{ mb: 2 }}
            >
              <Tab 
                icon={<SnackIcon />} 
                label="Snacks" 
                value="snacks" 
                iconPosition="start"
              />
              <Tab 
                icon={<RestaurantIcon />} 
                label="Main Course" 
                value="mainCourse" 
                iconPosition="start"
              />
              <Tab 
                icon={<BeverageIcon />} 
                label="Beverages" 
                value="beverages" 
                iconPosition="start"
              />
            </Tabs>
          </Box>
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Grid container spacing={3}>
              {filteredItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                    <Card 
                      sx={{ 
                        minWidth: 270,
                        minHeight: 390,
                        width: '100%',
                        height: '100%',
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        },
                        bgcolor: 'transparent'
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.name}
                        sx={{
                          transition: 'transform 0.3s',
                          objectFit: 'cover',
                          height: 200,
                          width: '100%',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, bgcolor: 'transparent' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" component="div">
                            {item.name}
                          </Typography>
                          <Chip
                            label={item.isVeg ? 'Veg' : 'Non-Veg'}
                            color={item.isVeg ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {item.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" color="primary">
                            ₹{item.price}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => handleAddToCartClick(item)}
                            startIcon={<AddCartIcon />}
                            sx={{
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

      <Dialog 
        open={showConfirmDialog} 
        onClose={handleCloseConfirmDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Add {selectedItem?.name} to Cart
            <IconButton onClick={handleCloseConfirmDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2, mb: 3 }}>
            Would you like to customize this item before adding it to your cart?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={handleCloseConfirmDialog} color="inherit" variant="text">
            Cancel
          </Button>
          <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
            <Button 
              onClick={handleAddWithoutCustomization} 
              variant="contained"
              startIcon={<AddCartIcon />}
              color="primary"
              fullWidth
              sx={{ minWidth: 0 }}
            >
              Add Without Customization
            </Button>
            <Button 
              onClick={handleOpenCustomization} 
              variant="outlined"
              startIcon={<SettingsIcon />}
              color="primary"
              fullWidth
              sx={{ fontWeight: 600, minWidth: 0 }}
            >
              Customize
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={Boolean(selectedItem) && !showConfirmDialog} 
        onClose={handleCloseCustomization}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Customize {selectedItem?.name}
            <IconButton onClick={handleCloseCustomization} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {selectedItem?.category !== 'beverages' && (
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Spice Level</FormLabel>
                <RadioGroup
                  value={customization.spiceLevel}
                  onChange={handleSpiceLevelChange}
                  row
                >
                  <FormControlLabel value="mild" control={<Radio />} label="Mild" />
                  <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                  <FormControlLabel value="hot" control={<Radio />} label="Hot" />
                  <FormControlLabel value="extra-hot" control={<Radio />} label="Extra Hot" />
                </RadioGroup>
              </FormControl>
            )}

            <TextField
              fullWidth
              label="Special Instructions"
              multiline
              rows={3}
              value={customization.specialInstructions}
              onChange={handleSpecialInstructionsChange}
              placeholder="Any special requests or preferences?"
              sx={{ mb: 3 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseCustomization} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleAddToCart} 
            variant="contained"
            startIcon={<AddCartIcon />}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Menu; 