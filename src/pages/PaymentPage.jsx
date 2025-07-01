import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store/slices/cartSlice'

const PaymentPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { totalAmount } = useSelector(state => state.cart)
  
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    // Add space after every 4 digits
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim()
    return formatted.substring(0, 19) // Limit to 16 digits + 3 spaces
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setPaymentInfo(prev => ({
      ...prev,
      cardNumber: formatted
    }))
    
    if (errors.cardNumber) {
      setErrors(prev => ({
        ...prev,
        cardNumber: ''
      }))
    }
  }

  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits
    }
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`
  }

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    setPaymentInfo(prev => ({
      ...prev,
      expiryDate: formatted
    }))
    
    if (errors.expiryDate) {
      setErrors(prev => ({
        ...prev,
        expiryDate: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (paymentInfo.paymentMethod === 'card') {
      if (!paymentInfo.cardNumber.trim() || paymentInfo.cardNumber.replace(/\D/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number'
      }
      
      if (!paymentInfo.cardHolder.trim()) {
        newErrors.cardHolder = 'Cardholder name is required'
      }
      
      if (!paymentInfo.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)'
      } else {
        // Check if the expiry date is in the future
        const [month, year] = paymentInfo.expiryDate.split('/')
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
        const currentDate = new Date()
        
        if (expiryDate < currentDate) {
          newErrors.expiryDate = 'Card has expired'
        }
      }
      
      if (!paymentInfo.cvv.trim() || !/^\d{3,4}$/.test(paymentInfo.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV code'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsProcessing(true)
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        // Clear the cart
        dispatch(clearCart())
        // Navigate to order confirmation
        navigate('/order-confirmation')
      }, 2000)
    }
  }

  // Payment method options
  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: 'credit-card' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal' },
    { id: 'apple-pay', name: 'Apple Pay', icon: 'apple' },
    { id: 'google-pay', name: 'Google Pay', icon: 'google' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
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
          <h1 className="text-xl font-bold">Payment</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>
      </div>

      <div className="py-6">
        <form onSubmit={handleSubmit}>
          {/* Payment Methods */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map(method => (
                <label 
                  key={method.id} 
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentInfo.paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentInfo.paymentMethod === method.id}
                      onChange={handleChange}
                      className="h-5 w-5 text-primary focus:ring-primary"
                    />
                    <div className="ml-3">
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Card Details (shown only if card payment method is selected) */}
          {paymentInfo.paymentMethod === 'card' && (
            <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
              <h2 className="text-lg font-semibold mb-4">Card Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full p-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                    maxLength="19"
                  />
                  {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                </div>
                
                <div>
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardHolder"
                    name="cardHolder"
                    value={paymentInfo.cardHolder}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full p-3 border ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                  />
                  {errors.cardHolder && <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      className={`w-full p-3 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                      maxLength="5"
                    />
                    {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className={`w-full p-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                      maxLength="4"
                    />
                    {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveCard"
                    name="saveCard"
                    checked={paymentInfo.saveCard}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary rounded"
                  />
                  <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                    Save this card for future payments
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Amount to Pay</span>
                  <span>{totalAmount.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Pay ${totalAmount.toFixed(2)} €`
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            By clicking the button above, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  )
}

export default PaymentPage