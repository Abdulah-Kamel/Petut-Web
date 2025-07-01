import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/slices/cartSlice'
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice'

const CatalogPage = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.catalog)
  const favorites = useSelector(state => state.favorites.items)
  const [activeTab, setActiveTab] = useState('all')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category))]
      setCategories(uniqueCategories)
    }
  }, [products])

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(item => item.id === product.id)
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id))
    } else {
      dispatch(addToFavorites(product))
    }
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeTab.toLowerCase())

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Catalog</h1>
        <div className="flex space-x-2">
          <Link to="/search" className="p-2 text-neutral hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          <Link to="/favorites" className="p-2 text-neutral hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-primary text-white rounded-lg p-4 mb-6 relative overflow-hidden">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="text-2xl font-bold mb-1">20% OFF</div>
            <div className="text-sm mb-2">on all electronics</div>
            <div className="text-xs">Limited Time Offer</div>
          </div>
          <div className="w-24 h-24 relative">
            <img 
              src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" 
              alt="Cat" 
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('all')} 
          className={`px-4 py-2 rounded-full whitespace-nowrap capitalize ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-white text-neutral'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveTab(category)} 
            className={`px-4 py-2 rounded-full whitespace-nowrap capitalize ${activeTab === category ? 'bg-primary text-white' : 'bg-white text-neutral'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="card hover:shadow-lg transition-shadow">
              <Link to={`/product/${product.id}`}>
                <div className="relative pb-[100%] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate" title={product.name}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <button 
                    onClick={() => toggleFavorite(product)}
                    className="text-gray-400 hover:text-primary focus:outline-none transition-colors flex-shrink-0"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6" 
                      fill={favorites.some(item => item.id === product.id) ? 'currentColor' : 'none'} 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={favorites.some(item => item.id === product.id) ? 0 : 2}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="btn-primary py-1 px-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters Button */}
      <div className="fixed bottom-6 right-6">
        <Link 
          to="/filters"
          className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default CatalogPage
