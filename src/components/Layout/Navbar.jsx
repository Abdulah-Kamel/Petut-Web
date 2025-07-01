import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { totalQuantity } = useSelector(state => state.cart)
  const { isAuthenticated } = useSelector(state => state.auth)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">PET<span className="text-neutral">.CARE</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/catalog" className="nav-link">Catalog</Link>
            <Link to="/search" className="nav-link">Search</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <button 
              onClick={() => navigate('/cart')} 
              className="relative p-2 text-neutral hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <Link to="/profile" className="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : (
              <Link to="/login" className="btn-primary">
                Log In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => navigate('/cart')} 
              className="relative p-2 mr-2 text-neutral hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="text-neutral hover:text-primary focus:outline-none focus:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/catalog" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Catalog</Link>
              <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Search</Link>
              <Link to="/brand" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Brand</Link>
              <Link to="/category" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Category</Link>
              <Link to="/delivery" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Delivery</Link>
              <Link to="/order-confirmation" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Order</Link>
              <Link to="/payment" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Payment</Link>
              <Link to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Favorites</Link>
              {isAuthenticated ? (
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium nav-link">Profile</Link>
              ) : (
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium btn-primary w-full text-center">Log In</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
