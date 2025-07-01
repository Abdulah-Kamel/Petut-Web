import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const OrderConfirmationPage = () => {
  // Generate a random order number
  const orderNumber = `PET-${Math.floor(100000 + Math.random() * 900000)}`
  
  // Get current date and estimated delivery date (5 days from now)
  const currentDate = new Date()
  const deliveryDate = new Date(currentDate)
  deliveryDate.setDate(deliveryDate.getDate() + 5)
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase</p>
        <div className="bg-gray-100 rounded-lg inline-block px-4 py-2 font-mono text-lg">
          {orderNumber}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Order Date</span>
            <span className="font-medium">{formatDate(currentDate)}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Estimated Delivery</span>
            <span className="font-medium">{formatDate(deliveryDate)}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-600">Shipping Address</span>
            <span className="font-medium text-right">123 Main Street<br />New York, NY 10001</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method</span>
            <span className="font-medium">Credit Card (**** 1234)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        {/* Mock order items */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center pb-4 border-b border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
              <img 
                src="https://www.brit-petfood.com/dam/jcr:98f73f18-0462-41c7-8693-173b1767551e/brit-care-dog-adult-m.png"
                alt="Brit Care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Brit Care</h3>
              <p className="text-sm text-gray-600">Premium Adult M food for adult dogs</p>
              <div className="flex justify-between mt-1">
                <span className="text-sm">Qty: 2</span>
                <span className="font-medium">318.00 €</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-4">
              <img 
                src="https://vitamax.com.ua/image/cache/catalog/vitamax-cat-vit-60-500x500.jpg"
                alt="Vitamax"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Vitamax</h3>
              <p className="text-sm text-gray-600">Vitamins and minerals for cats</p>
              <div className="flex justify-between mt-1">
                <span className="text-sm">Qty: 1</span>
                <span className="font-medium">115.18 €</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>433.18 €</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>433.18 €</span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-600">
          We've sent a confirmation email to <span className="font-medium">your-email@example.com</span> with all the details.
        </p>
        
        <div className="space-x-4">
          <Link 
            to="/catalog" 
            className="inline-block py-3 px-6 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
          
          <Link 
            to="/profile" 
            className="inline-block py-3 px-6 bg-white text-primary font-semibold rounded-lg border border-primary hover:bg-gray-50 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
