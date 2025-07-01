import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload
      if (!state.items.some(i => i.id === item.id)) {
        state.items.push(item)
      }
    },
    removeFromFavorites: (state, action) => {
      const itemId = action.payload
      state.items = state.items.filter(item => item.id !== itemId)
    },
    clearFavorites: (state) => {
      state.items = []
    },
  },
})

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer