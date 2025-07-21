import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId))
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }))
    }
  }

  const handleApplyPromo = (e) => {
    e.preventDefault()
    // Mock promo code validation
    if (promoCode.toUpperCase() === 'SAVE20') {
      setPromoApplied(true)
      setDiscount(totalAmount * 0.2) // 20% discount
    } else {
      setPromoApplied(false)
      setDiscount(0)
    }
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart())
    }
  }

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page
    navigate('/delivery')
  }

  // Calculate final amount after discount
  const finalAmount = totalAmount - discount

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24 mt-14">
      <div className="sticky top-0 bg-white z-10 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="text-neutral"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          {items.length > 0 && (
            <button 
              onClick={handleClearCart}
              className="text-red-500 text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/catalog" className="btn-primary py-2 px-6">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="py-6">
          {/* Cart Items */}
          <div className="space-y-4 mb-8">
            {items.map(item => (
              <div key={item.id} className="flex border border-gray-200 rounded-lg overflow-hidden">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={item.imageURL}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.productName}</h3>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description.substring(0, 60)}...</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold">{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold mb-2">Promo Code</h3>
            <form onSubmit={handleApplyPromo} className="flex">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors"
              >
                Apply
              </button>
            </form>
            {promoApplied && (
              <div className="mt-2 text-green-600 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Promo code applied successfully!
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (20%)</span>
                  <span>-{discount.toFixed(2)} €</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{finalAmount.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button 
            onClick={handleCheckout}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default CartPage
