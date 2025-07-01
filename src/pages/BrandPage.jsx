import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Static data for brands, as we don't have a dedicated brand API
const brandDetails = {
  fashionbrand: {
    id: 'fashionbrand',
    name: 'FashionBrand',
    logo: 'https://i.imgur.com/vP3bBwW.png', // Placeholder logo for fashion
    description: 'Leading the trend in modern apparel and accessories for a stylish lifestyle.',
    foundedYear: 2020,
    country: 'USA',
    website: '#',
  },
  luxurygems: {
    id: 'luxurygems',
    name: 'LuxuryGems',
    logo: 'https://i.imgur.com/XqJgJ6T.png', // Placeholder logo for jewelry
    description: 'Exquisite and timeless jewelry pieces for every memorable occasion.',
    foundedYear: 2015,
    country: 'France',
    website: '#',
  },
  techtronics: {
    id: 'techtronics',
    name: 'Techtronics',
    logo: 'https://i.imgur.com/J5nL4tZ.png', // Placeholder logo for electronics
    description: 'Cutting-edge electronics and gadgets to power your connected life.',
    foundedYear: 2010,
    country: 'South Korea',
    website: '#',
  },
  'general goods': {
    id: 'generalgoods',
    name: 'General Goods',
    logo: 'https://i.imgur.com/mZ4xbeo.png', // Placeholder logo for general goods
    description: 'A wide variety of quality products for all your everyday needs.',
    foundedYear: 2018,
    country: 'Canada',
    website: '#',
  },
};

const BrandPage = () => {
  const { brandId } = useParams();
  const { products: allProducts, loading, error: catalogError } = useSelector(state => state.catalog);

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('popularity');

  useEffect(() => {
    if (catalogError) {
      setError(catalogError);
      return;
    }

    if (brandId && allProducts.length > 0) {
      const lowerCaseBrandId = brandId.toLowerCase().replace(/-/g, ' ');
      const brandInfo = Object.values(brandDetails).find(b => b.name.toLowerCase() === lowerCaseBrandId);

      if (brandInfo) {
        setBrand(brandInfo);
        const filteredProducts = allProducts.filter(p => p.brand.toLowerCase() === lowerCaseBrandId);
        setProducts(filteredProducts);
        setError(null);
      } else {
        setBrand(null);
        setProducts([]);
        setError(`Brand "${brandId}" not found.`);
      }
    } else if (!loading && brandId) {
      const lowerCaseBrandId = brandId.toLowerCase().replace(/-/g, ' ');
      const brandInfo = Object.values(brandDetails).find(b => b.name.toLowerCase() === lowerCaseBrandId);
      if (!brandInfo) {
        setError(`Brand "${brandId}" not found.`);
      }
    }
  }, [brandId, allProducts, loading, catalogError]);

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

  if (loading && !brand) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Brand not found. Please check the URL and try again.</p>
        </div>
        <div className="mt-4">
          <Link to="/catalog" className="text-primary hover:underline">Return to catalog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Brand Header */}
      <div className="flex flex-col md:flex-row items-center mb-8 p-6 bg-white rounded-lg shadow-md">
        <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full p-4 mb-4 md:mb-0 md:mr-6">
          <img src={brand.logo} alt={`${brand.name} logo`} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800">{brand.name}</h1>
          <p className="text-gray-600 mt-2">{brand.description}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Founded:</span> {brand.foundedYear}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Country:</span> {brand.country}
            </div>
            {brand.website && brand.website !== '#' && (
              <div className="text-sm text-gray-500">
                <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Products Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Products by {brand.name}</h2>
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
      
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-48 overflow-hidden flex items-center justify-center bg-white p-2">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={product.name}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">{product.rating?.rate || 'N/A'}</span>
                    <span className="text-xs text-gray-500 ml-1">({product.rating?.count || 0})</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    className="w-full bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <p className="text-gray-600">No products found for this brand.</p>
        </div>
      )}
      
      {/* Back to Catalog Link */}
      <div className="mt-8">
        <Link to="/catalog" className="text-primary hover:underline flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to All Products
        </Link>
      </div>
    </div>
  );

};

export default BrandPage;
