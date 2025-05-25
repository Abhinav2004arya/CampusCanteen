import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';

import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff9800', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#212121', 
      contrastText: '#fff',
    },
    background: {
      default: '#121212', 
      paper: '#212121',
    },
    text: {
      primary: '#fff',
      secondary: '#ff9800',
    },
    success: {
      main: '#43a047', 
    },
    error: {
      main: '#e53935', 
    },
    warning: {
      main: '#ffc107', 
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Avenir, Roboto, Arial, sans-serif',
    fontWeightBold: 700,
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#212121',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #ff9800 30%, #ff5722 90%)',
          color: '#fff',
        },
        outlinedPrimary: {
          borderColor: '#ff9800',
          color: '#ff9800',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1, width: '100%', padding: '20px 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
