import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  query: '',
  results: [],
  recentSearches: [],
  loading: false,
  error: null,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload
    },
    searchStart(state) {
      state.loading = true
      state.error = null
    },
    searchSuccess(state, action) {
      state.loading = false
      state.results = action.payload
      // Add to recent searches if not already there
      if (state.query && !state.recentSearches.includes(state.query)) {
        state.recentSearches = [state.query, ...state.recentSearches].slice(0, 5)
      }
    },
    searchFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    addRecentSearch(state, action) {
      const searchTerm = action.payload
      if (searchTerm && !state.recentSearches.includes(searchTerm)) {
        state.recentSearches = [searchTerm, ...state.recentSearches].slice(0, 5)
      }
    },
    clearSearch(state) {
      state.query = ''
      state.results = []
    },
    clearRecentSearches(state) {
      state.recentSearches = []
    },
  },
})

export const {
  setSearchQuery,
  searchStart,
  searchSuccess,
  searchFailure,
  addRecentSearch,
  clearSearch,
  clearRecentSearches,
} = searchSlice.actions

export default searchSlice.reducer