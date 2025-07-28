import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./context/AuthContext";
import { fetchFavorites } from "./store/slices/favoritesSlice";
import {
  loadCartFromFirestore,
  saveCartToFirestore,
  clearCart,
} from "./store/slices/cartSlice";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import FilterPage from "./pages/FilterPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DeliveryPage from "./pages/DeliveryPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import FavoritesPage from "./pages/FavoritesPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ClinicsScreen from "./pages/ClinicsScreen";
import ClinicDetailsScreen from "./pages/ClinicDetailsScreen";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import BookingLoadingPage from "./pages/BookingLoadingPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import CompleteProfile from "./pages/CompleteProfile.jsx";
import NotificationHandler from "./components/Notification/NotificationHandler.jsx";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const cart = useSelector((state) => state.cart);
  const prevUserRef = useRef();
  const prevCartRef = useRef(cart);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchFavorites(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  // On login/logout: sync cart
  useEffect(() => {
    const prevUser = prevUserRef.current;
    if (currentUser && !prevUser) {
      // User just logged in: merge guest cart with Firestore cart
      dispatch(loadCartFromFirestore(currentUser.uid)).then((action) => {
        const firestoreCart = action.payload || {
          items: [],
          totalQuantity: 0,
          totalAmount: 0,
        };
        // Merge guest cart (Redux) and Firestore cart
        const mergedItems = [...firestoreCart.items];
        cart.items.forEach((guestItem) => {
          const existing = mergedItems.find((item) => item.id === guestItem.id);
          if (existing) {
            existing.quantity += guestItem.quantity;
            existing.totalPrice = existing.price * existing.quantity;
          } else {
            mergedItems.push({ ...guestItem });
          }
        });
        const mergedCart = {
          items: mergedItems,
          totalQuantity: mergedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalAmount: mergedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
        };
        dispatch(
          saveCartToFirestore({ uid: currentUser.uid, cart: mergedCart })
        ).then(() => {
          // Load merged cart into Redux
          dispatch(loadCartFromFirestore(currentUser.uid));
        });
      });
    } else if (!currentUser && prevUser) {
      // User just logged out: clear cart (guest cart is empty)
      dispatch(clearCart());
    }
    prevUserRef.current = currentUser;
    // eslint-disable-next-line
  }, [currentUser, dispatch]);

  // On cart change: save to Firestore if logged in
  useEffect(() => {
    const prevCart = prevCartRef.current;
    if (
      currentUser &&
      prevCart &&
      (prevCart.items !== cart.items ||
        prevCart.totalQuantity !== cart.totalQuantity ||
        prevCart.totalAmount !== cart.totalAmount)
    ) {
      dispatch(saveCartToFirestore({ uid: currentUser.uid, cart }));
    }
    prevCartRef.current = cart;
    // eslint-disable-next-line
  }, [cart, currentUser, dispatch]);

  return (
    <>
      <NotificationHandler />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="filters" element={<FilterPage />} />
          <Route path="prحoduct/:productId" element={<ProductPage />} />
          <Route
            path="delivery"
            element={
              <ProtectedRoute>
                <DeliveryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="clinics"
            element={
              <ProtectedRoute>
                <ClinicsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="ClinicDetailsScreen"
            element={
              <ProtectedRoute>
                <ClinicDetailsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <ProtectedRoute>
                <BookingConfirmationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-loading"
            element={
              <ProtectedRoute>
                <BookingLoadingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-success"
            element={
              <ProtectedRoute>
                <BookingSuccessPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Routes>
    </>
  );
}

export default App;
