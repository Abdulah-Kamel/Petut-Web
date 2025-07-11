import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchSuccess, searchFailure } from '../store/slices/searchSlice';
import SearchResultsHeader from '../components/search-results/SearchResultsHeader';
import SortControls from '../components/search-results/SortControls';
import FilterPanel from '../components/search-results/FilterPanel';
import ProductGrid from '../components/search-results/ProductGrid';

const SearchResultPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, results, loading, error } = useSelector(state => state.search);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!query) {
      navigate('/search');
      return;
    }

    if (query && results.length === 0 && !loading && !error) {
      performSearch(query);
    }
  }, [query, results, loading, error, navigate]);

  const performSearch = (searchQuery) => {
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
        );
        
        dispatch(searchSuccess(mockProducts));
      } catch (err) {
        dispatch(searchFailure('Failed to fetch search results'));
      }
    }, 500);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    
    let sortedResults = [...results];
    
    switch (sortValue) {
      case 'price-high':
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sortedResults.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }
    
    dispatch(searchSuccess(sortedResults));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-500 py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SearchResultsHeader query={query} resultsCount={results.length} />
      <SortControls 
        sortBy={sortBy} 
        onSortChange={handleSortChange} 
        onToggleFilters={toggleFilters} 
      />
      <FilterPanel showFilters={showFilters} />
      <ProductGrid results={results} query={query} />
    </div>
  );
};

export default SearchResultPage
