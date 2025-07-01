import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DeliveryPage = () => {
  const navigate = useNavigate()
  const { totalAmount } = useSelector(state => state.cart)
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'standard',
    deliveryTime: 'anytime'
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!deliveryInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!deliveryInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10,}$/.test(deliveryInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!deliveryInfo.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!deliveryInfo.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!deliveryInfo.city.trim()) {
      newErrors.city = 'City is required'
    }
    
    if (!deliveryInfo.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, this would submit the delivery info to the backend
      navigate('/payment')
    }
  }

  // Delivery method options
  const deliveryMethods = [
    { id: 'standard', name: 'Standard Delivery', price: 0, description: 'Delivery within 3-5 business days', icon: 'truck' },
    { id: 'express', name: 'Express Delivery', price: 9.99, description: 'Delivery within 1-2 business days', icon: 'bolt' },
    { id: 'pickup', name: 'Store Pickup', price: 0, description: 'Pickup from our store', icon: 'store' }
  ]

  // Delivery time options
  const deliveryTimes = [
    { id: 'anytime', name: 'Anytime' },
    { id: 'morning', name: 'Morning (8:00 - 12:00)' },
    { id: 'afternoon', name: 'Afternoon (12:00 - 17:00)' },
    { id: 'evening', name: 'Evening (17:00 - 21:00)' }
  ]

  // Calculate total with delivery fee
  const selectedMethod = deliveryMethods.find(method => method.id === deliveryInfo.deliveryMethod)
  const deliveryFee = selectedMethod ? selectedMethod.price : 0
  const finalTotal = totalAmount + deliveryFee

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
          <h1 className="text-xl font-bold">Delivery Information</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>
      </div>

      <div className="py-6">
        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={deliveryInfo.email}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                  placeholder="123 Main St, Apt 4B"
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryInfo.city}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                    placeholder="New York"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={deliveryInfo.postalCode}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-primary`}
                    placeholder="10001"
                  />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Method</h2>
            <div className="space-y-3">
              {deliveryMethods.map(method => (
                <label 
                  key={method.id} 
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${deliveryInfo.deliveryMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={method.id}
                      checked={deliveryInfo.deliveryMethod === method.id}
                      onChange={handleChange}
                      className="h-5 w-5 text-primary focus:ring-primary"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{method.name}</span>
                        <span className="font-medium">
                          {method.price === 0 ? 'Free' : `${method.price.toFixed(2)} €`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Time */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Preferred Delivery Time</h2>
            <div className="grid grid-cols-2 gap-3">
              {deliveryTimes.map(time => (
                <label 
                  key={time.id} 
                  className={`block p-3 border rounded-lg cursor-pointer text-center transition-colors ${deliveryInfo.deliveryTime === time.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <input
                    type="radio"
                    name="deliveryTime"
                    value={time.id}
                    checked={deliveryInfo.deliveryTime === time.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{time.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{totalAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `${deliveryFee.toFixed(2)} €`}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button 
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default DeliveryPage