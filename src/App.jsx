import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from './context/AuthContext';
import { fetchFavorites } from './store/slices/favoritesSlice';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import FilterPage from './pages/FilterPage';
import BrandPage from './pages/BrandPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DeliveryPage from './pages/DeliveryPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFavorites(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="search/result" element={<SearchResultPage />} />
        <Route path="filters" element={<FilterPage />} />
        <Route path="brand/:brandId" element={<BrandPage />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="delivery" element={<DeliveryPage />} />
        <Route path="order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route 
          path="profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;