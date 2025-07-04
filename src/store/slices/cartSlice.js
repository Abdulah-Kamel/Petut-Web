import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.price * existingItem.quantity
      }
      
      state.totalQuantity++
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
    removeFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.price * existingItem.quantity
      }
      
      state.totalQuantity--
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
    },
    clearCart(state) {
      return initialState
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        const quantityChange = quantity - item.quantity
        item.quantity = quantity
        item.totalPrice = item.price * quantity
        
        state.totalQuantity += quantityChange
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      }
    },
  },
})

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions

export default cartSlice.reducer