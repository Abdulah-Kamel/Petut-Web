import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { products: allProducts, loading, error } = useSelector(state => state.catalog);
  const { items: favorites } = useSelector(state => state.favorites);
  const { currentUser } = useAuth();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [sortOption, setSortOption] = useState('popularity');

  useEffect(() => {
    const categoryName = categoryId.replace(/-/g, ' ');

    if (categoryName && allProducts.length > 0) {
      const filtered = allProducts.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
      setProducts(filtered);
      if (filtered.length > 0) {
        setCategory({
          name: categoryName,
          icon: 'https://www.svgrepo.com/show/49889/dog-food.svg', // Placeholder icon
          description: `Find the best products in ${categoryName}.`,
          productCount: filtered.length,
          subcategories: [], // Placeholder
        });
      } else {
        setCategory(null);
      }
    }
  }, [categoryId, allProducts]);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
      default:
        sorted.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
        break;
    }
    return sorted;
  }, [products, sortOption]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const toggleFavorite = (product) => {
    if (!currentUser) {
      alert('Please log in to manage your favorites.');
      return;
    }
    const isFavorite = favorites.some(item => item.id === product.id);
    if (isFavorite) {
      dispatch(removeFavorite({ userId: currentUser.uid, productId: product.id }));
    } else {
      dispatch(addFavorite({ userId: currentUser.uid, product }));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    )
  }
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Category not found or no products in this category.</p>
        </div>
        <div className="mt-4">
          <Link to="/catalog" className="text-primary hover:underline">Return to catalog</Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center bg-primary-light rounded-full mr-4">
            <img src={category.icon} alt={`${category.name} icon`} className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 capitalize">{category.name}</h1>
        </div>
        <p className="text-gray-600">{category.description}</p>
        <div className="mt-4 text-sm text-gray-500">{category.productCount} products</div>
      </div>
      
      {/* Subcategories - Placeholder */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
        <div className="flex flex-wrap gap-3">
           <p className="text-gray-500">No subcategories available.</p>
        </div>
      </div>
      
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <button 
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
          onClick={() => alert('Filter functionality coming soon!')}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          Filter
        </button>
        
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Sort by:</span>
          <select 
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some(item => item.id === product.id)}
          />
        ))}
      </div>
      
      {/* Back to Catalog Link */}
      <div className="mt-8">
        <Link to="/catalog" className="text-primary hover:underline flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Catalog
        </Link>
      </div>
    </div>
  )

}

export default CategoryPage
