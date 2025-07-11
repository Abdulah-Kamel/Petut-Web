import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  searchStart,
  searchSuccess,
  searchFailure,
  addRecentSearch,
} from "../store/slices/searchSlice";
import SearchBar from "../components/search/SearchBar";
import RecentSearches from "../components/search/RecentSearches";
import SearchResults from "../components/search/SearchResults";

const SearchPage = () => {
  const dispatch = useDispatch();
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
    <div className="max-w-7xl mx-auto px-4 mt-14">
      <div className="sticky top-0 bg-white z-10 pt-4 pb-2">
        <SearchBar
          value={inputValue}
          onChange={handleInputChange}
          onSearch={performSearch}
          onClear={handleClearInput}
        />
      </div>

      {showRecent && (
        <RecentSearches
          recentSearches={recentSearches}
          onSelectRecent={handleSelectRecent}
        />
      )}

      <SearchResults
        loading={loading}
        error={error}
        results={results}
        query={query}
      />
    </div>
  );
};

export default SearchPage;
