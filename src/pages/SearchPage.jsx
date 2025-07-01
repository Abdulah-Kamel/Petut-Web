import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setSearchQuery,
  searchStart,
  searchSuccess,
  searchFailure,
  addRecentSearch,
} from "../store/slices/searchSlice";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, results, recentSearches, loading, error } = useSelector(
    (state) => state.search
  );
  const { products: allProducts } = useSelector((state) => state.catalog);
  const [inputValue, setInputValue] = useState(query || "");
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  useEffect(() => {
    setShowRecent(inputValue === "" && recentSearches.length > 0);
  }, [inputValue, recentSearches]);

  const performSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;

    dispatch(setSearchQuery(searchTerm));
    dispatch(searchStart());
    dispatch(addRecentSearch(searchTerm));

    try {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch(searchSuccess(filteredProducts));
    } catch (err) {
      dispatch(searchFailure(err.message));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
    document.getElementById("search-input").focus();
  };

  const handleSelectRecent = (term) => {
    setInputValue(term);
    performSearch(term);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="sticky top-0 bg-white z-10 pt-4 pb-2">
        <form onSubmit={handleSearch} className="relative mb-4">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="absolute left-3 text-neutral"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <input
              id="search-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search products, brands, etc."
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {inputValue && (
              <button
                type="button"
                onClick={handleClearInput}
                className="absolute right-14 text-neutral"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <button type="submit" className="absolute right-3 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Quick filters */}
        <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          <Link
            to="/filters?category=food"
            className="px-4 py-2 bg-white text-neutral rounded-full whitespace-nowrap border border-gray-200"
          >
            Food
          </Link>
          <Link
            to="/filters?category=vitamins"
            className="px-4 py-2 bg-white text-neutral rounded-full whitespace-nowrap border border-gray-200"
          >
            Vitamins
          </Link>
          <Link
            to="/filters?category=toys"
            className="px-4 py-2 bg-white text-neutral rounded-full whitespace-nowrap border border-gray-200"
          >
            Toys
          </Link>
          <Link
            to="/filters?brand=royal-canin"
            className="px-4 py-2 bg-white text-neutral rounded-full whitespace-nowrap border border-gray-200"
          >
            Royal Canin
          </Link>
          <Link
            to="/filters?brand=brit"
            className="px-4 py-2 bg-white text-neutral rounded-full whitespace-nowrap border border-gray-200"
          >
            Brit
          </Link>
        </div>
      </div>

      {/* Recent searches */}
      {showRecent && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
          <ul className="space-y-2">
            {recentSearches.slice(0, 5).map((term, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectRecent(term)}
                  className="flex items-center w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3 text-neutral"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-left">{term}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search results */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : results.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product) => (
              <div
                key={product.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="relative pb-[100%] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <button className="text-gray-400 hover:text-primary focus:outline-none transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      {product.price.toFixed(2)} €
                    </span>
                    <button className="btn-primary py-1 px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-gray-600">
            We couldn't find any products matching "{query}"
          </p>
          <div className="mt-6">
            <Link to="/catalog" className="btn-primary py-2 px-6">
              Browse Catalog
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
