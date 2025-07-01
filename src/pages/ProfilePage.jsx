import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout())
      navigate('/')
    }
  }

  // Mock order history data
  const orders = [
    {
      id: 'PET-123456',
      date: '2023-05-15',
      status: 'Delivered',
      total: 433.18,
      items: [
        { name: 'Brit Care', quantity: 2, price: 159.0 },
        { name: 'Vitamax', quantity: 1, price: 115.18 }
      ]
    },
    {
      id: 'PET-789012',
      date: '2023-04-02',
      status: 'Delivered',
      total: 212.48,
      items: [
        { name: 'Trixie', quantity: 1, price: 94.48 },
        { name: 'Tetra', quantity: 2, price: 59.0 }
      ]
    }
  ]

  // Mock address data
  const addresses = [
    {
      id: 1,
      name: 'Home',
      address: '123 Main Street',
      city: 'New York',
      postalCode: '10001',
      isDefault: true
    },
    {
      id: 2,
      name: 'Work',
      address: '456 Office Avenue',
      city: 'New York',
      postalCode: '10002',
      isDefault: false
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 text-center border-b border-gray-200">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={user?.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                  alt={user?.name || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
            </div>
            
            <div className="p-4">
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Orders</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'addresses' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Addresses</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'favorites' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Favorites</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      defaultValue={user?.name || ''}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={user?.email || ''}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      defaultValue="1990-01-01"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">My Orders</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                  <button 
                    onClick={() => navigate('/catalog')}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">Order ID:</span>
                          <span className="ml-2 font-mono font-medium">{order.id}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Date:</span>
                          <span className="ml-2">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Status:</span>
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="ml-2 font-semibold">{order.total.toFixed(2)} €</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold mb-3">Items</h3>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <span className="font-medium">{item.name}</span>
                                <span className="ml-2 text-sm text-gray-600">x{item.quantity}</span>
                              </div>
                              <span>{(item.price * item.quantity).toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 flex justify-end space-x-4">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Addresses</h2>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Add New Address
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map(address => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                    <h3 className="font-semibold text-lg mb-1">{address.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {address.address}<br />
                      {address.city}, {address.postalCode}
                    </p>
                    <div className="flex space-x-3">
                      <button className="text-primary hover:underline text-sm">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline text-sm">
                        Delete
                      </button>
                      {!address.isDefault && (
                        <button className="text-primary hover:underline text-sm">
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Mock favorite products */}
                <div className="card hover:shadow-lg transition-shadow">
                  <div className="relative pb-[100%] overflow-hidden">
                    <img 
                      src="https://www.brit-petfood.com/dam/jcr:98f73f18-0462-41c7-8693-173b1767551e/brit-care-dog-adult-m.png"
                      alt="Brit Care"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Brit Care</h3>
                      <button className="text-red-500 hover:text-red-600 focus:outline-none transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Premium Adult M food for adult dogs of medium breeds</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">159.00 €</span>
                      <button className="btn-primary py-1 px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="card hover:shadow-lg transition-shadow">
                  <div className="relative pb-[100%] overflow-hidden">
                    <img 
                      src="https://vitamax.com.ua/image/cache/catalog/vitamax-cat-vit-60-500x500.jpg"
                      alt="Vitamax"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">Vitamax</h3>
                      <button className="text-red-500 hover:text-red-600 focus:outline-none transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Vitamins and minerals for cats</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">115.18 €</span>
                      <button className="btn-primary py-1 px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive order updates and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive order status updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-gray-600">Receive offers and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-3">Privacy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Profile Picture</p>
                        <p className="text-sm text-gray-600">Your profile picture will be visible to other users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Collection</p>
                        <p className="text-sm text-gray-600">Allow us to collect usage data to improve our services</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-3">Account</h3>
                  <div className="space-y-4">
                    <button className="text-primary hover:underline">
                      Download My Data
                    </button>
                    <div>
                      <button className="text-red-500 hover:underline">
                        Delete My Account
                      </button>
                      <p className="text-sm text-gray-600 mt-1">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    type="button"
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
