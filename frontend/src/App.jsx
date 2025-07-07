import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Merchandise from './pages/Merchandise';
import Cart from './pages/Cart';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { useEffect } from 'react';
import { fetchMerchandise as fetchMerchandiseAction } from './store/slices/merchandiseSlice';
import { fetchOrders } from './store/slices/orderSlice';
import { fetchUser } from './store/slices/userSlice';
import { fetchCart } from './store/slices/cartSlice';
import { setTheme } from './store/slices/uiSlice';
import { fetchEvents } from './store/slices/eventsSlice';
import { createTheme } from '@mui/material/styles';
import './index.css';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
      light: '#ff3d47',
      dark: '#b20710',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.error);
  const theme = useSelector((state) => state.ui.theme);
  const isDark = theme === 'dark';
  const user = useSelector((state) => state.user?.user || null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch public data first
    dispatch(fetchMerchandiseAction());
    dispatch(fetchEvents());

    // Only fetch user-specific data if user is logged in
    if (user || userId) {
      dispatch(fetchOrders());
      dispatch(fetchUser());
      dispatch(fetchCart());
    }
    dispatch(setTheme('dark'));
  }, [dispatch, user, userId]);

  return (
    <AuthProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/merchandise" element={<Merchandise />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/order-tracking" element={<PrivateRoute><OrderTracking /></PrivateRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          {isLoading && (
            <Box
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
          <Toaster position="top-right" />
        </ErrorBoundary>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;