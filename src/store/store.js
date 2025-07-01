import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './slices/catalogSlice'
import searchReducer from './slices/searchSlice'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import favoritesReducer from './slices/favoritesSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    search: searchReducer,
    filter: filterReducer,
    cart: cartReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
})