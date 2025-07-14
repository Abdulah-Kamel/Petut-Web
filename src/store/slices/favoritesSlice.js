import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { collection, doc, getDocs, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

// Async thunk to fetch favorites for a user
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const favoritesCol = collection(db, 'users', userId, 'favorites');
      const snapshot = await getDocs(favoritesCol);
      const favoriteIds = snapshot.docs.map(doc => doc.id);
      
      // Fetch full product details for each favorite
      const favoriteProducts = await Promise.all(
        favoriteIds.map(async (id) => {
          const productDoc = await getDoc(doc(db, 'products', id));
          return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
        })
      );
      
      return favoriteProducts.filter(p => p !== null);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a favorite
export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const favoriteRef = doc(db, 'users', userId, 'favorites', product.id);
      await setDoc(favoriteRef, { productId: product.id }); // Store a reference
      return product; // Return the full product to add to state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to remove a favorite
export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
      await deleteDoc(favoriteRef);
      return productId; // Return the ID of the removed product
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add Favorite
      .addCase(addFavorite.fulfilled, (state, action) => {
        const newItem = action.payload;
        if (!state.items.some(item => item.id === newItem.id)) {
          state.items.push(newItem);
        }
      })
      // Remove Favorite
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;