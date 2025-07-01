import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  categories: [],
  brands: [],
  loading: false,
  error: null,
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess(state, action) {
      state.loading = false
      state.products = action.payload
    },
    fetchProductsFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    fetchCategoriesSuccess(state, action) {
      state.categories = action.payload
    },
    fetchBrandsSuccess(state, action) {
      state.brands = action.payload
    },
  },
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesSuccess,
  fetchBrandsSuccess,
} = catalogSlice.actions

export default catalogSlice.reducer