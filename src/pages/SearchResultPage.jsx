import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { searchSuccess, searchFailure } from '../store/slices/searchSlice'

const SearchResultPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { query, results, loading, error } = useSelector(state => state.search)
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // If there's no query or results, redirect to search page
    if (!query) {
      navigate('/search')
      return
    }

    // If we have a query but no results yet, perform the search
    if (query && results.length === 0 && !loading && !error) {
      performSearch(query)
    }
  }, [query, results, loading, error, navigate])

  const performSearch = (searchQuery) => {
    // Simulate API call with mock data
    setTimeout(() => {
      try {
        const mockProducts = [
          {
            id: 1,
            name: 'Brit Care',
            description: 'Premium Adult M food for adult dogs of medium breeds',
            price: 159.0,
            image: 'https://www.brit-petfood.com/dam/jcr:98f73f18-0462-41c7-8693-173b1767551e/brit-care-dog-adult-m.png',
            category: 'Food',
            brand: 'Brit',
            rating: 4.5,
            reviews: 128,
          },
          {
            id: 2,
            name: 'Vitamax',
            description: 'Multivitamin supplement for dogs and cats',
            price: 89.0,
            image: 'https://vitamax.com.ua/image/cache/catalog/vitamax-cat-vit-60-500x500.jpg',
            category: 'Vitamins',
            brand: 'Vitamax',
            rating: 4.2,
            reviews: 95,
          },
          {
            id: 3,
            name: 'Trixie',
            description: 'Interactive dog toy for mental stimulation',
            price: 129.0,
            image: 'https://m.media-amazon.com/images/I/71J8iNo+35L._AC_UF1000,1000_QL80_.jpg',
            category: 'Toys',
            brand: 'Trixie',
            rating: 4.7,
            reviews: 64,
          },
          {
            id: 4,
            name: 'Tetra',
            description: 'Water Mix - Food for all kinds of bottom fish',
            price: 59.0,
            image: '/src/assets/products/tetra.svg',
            category: 'Food',
            brand: 'Tetra',
            rating: 4.0,
            reviews: 42,
          },
        ].filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        
        dispatch(searchSuccess(mockProducts))
      } catch (err) {
        dispatch(searchFailure('Failed to fetch search results'))
      }
    }, 500)
  }

  const handleSortChange = (e) => {
    const sortValue = e.target.value
    setSortBy(sortValue)
    
    // Sort the results based on the selected option
    let sortedResults = [...results]
    
    switch (sortValue) {
      case 'price-high':
        sortedResults.sort((a, b) => b.price - a.price)
        break
      case 'price-low':
        sortedResults.sort((a, b) => a.price - b.price)
        break
      case 'rating':
        sortedResults.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        sortedResults.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        // Keep original order
        break
    }
    
    dispatch(searchSuccess(sortedResults))
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      } else {
        stars.push(
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      }
    }
    
    return stars
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-500 py-8">{error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with search info and back button */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/search')}
            className="mr-3 text-neutral"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Results for "{query}"</h1>
        </div>
        <p className="text-gray-600">{results.length} products found</p>
      </div>

      {/* Sorting and filtering options */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center">
          <button 
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-full mr-3 hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          <Link 
            to="/filters"
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Advanced Filters
          </Link>
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
          <select 
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="default">Relevance</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Filter panel (collapsible) */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Food</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Vitamins</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Toys</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Brands</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Brit</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Vitamax</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Trixie</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-primary" />
                  <span className="ml-2">Tetra</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>€0</span>
                  <span>€1000</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" 
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-full mr-2 hover:bg-gray-300 transition-colors">
              Reset
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Product grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(product => (
            <div key={product.id} className="card hover:shadow-lg transition-shadow">
              <div className="relative pb-[100%] overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 text-gray-400 hover:text-primary focus:outline-none transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
                  <button className="btn-primary py-1 px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600">We couldn't find any products matching "{query}"</p>
          <div className="mt-6">
            <Link to="/catalog" className="btn-primary py-2 px-6">
              Browse Catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResultPage
