import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {
  setSelectedCategories,
  setSelectedBrands,
  setPriceRange,
  setRating,
} from '../store/slices/filterSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import ProductCard from '../components/ProductCard';
import {fetchProducts} from "../store/slices/catalogSlice.js";

const CatalogPage = () => {
    const dispatch = useDispatch();
  const location = useLocation();
  const filters = useSelector((state) => state.filter);
  const { products, loading, error } = useSelector(state => state.catalog)
  const favorites = useSelector(state => state.favorites.items)
  const [activeTab, setActiveTab] = useState('all')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category))]
      setCategories(uniqueCategories)
    }else {
      dispatch(fetchProducts())
    }

    }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categories = params.getAll('category');
    const brands = params.getAll('brand');
    const priceMin = params.get('price_min');
    const priceMax = params.get('price_max');
    const rating = params.get('rating');

    // Update Redux state from URL, but only if filters are present
    if (categories.length > 0) dispatch(setSelectedCategories(categories));
    if (brands.length > 0) dispatch(setSelectedBrands(brands));
    if (priceMin && priceMax) {
      dispatch(setPriceRange({ min: parseInt(priceMin, 10), max: parseInt(priceMax, 10) }));
    } else {
      dispatch(setPriceRange({ min: 0, max: 10000 })); // Reset to a wide default
    }
    if (rating) {
      dispatch(setRating(parseInt(rating, 10)));
    } else {
      dispatch(setRating(0)); // Reset to default
    }
  }, [location.search, dispatch]);

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

  const filteredProducts = products.filter((product) => {
    const { selectedCategories, selectedBrands, priceRange, rating } = filters;

    // Category filter from Redux state
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Brand filter from Redux state
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Price range filter from Redux state
    if (product.price < priceRange.min || product.price > priceRange.max) {
      return false;
    }

    // Rating filter from Redux state
    if (rating > 0 && product.rating < rating) {
      return false;
    }
    
    // Local category tab filter
    if (activeTab !== 'all' && product.category.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }

    return true;
  });

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
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.some(item => item.id === product.id)}
            />
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
