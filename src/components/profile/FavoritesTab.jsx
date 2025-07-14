import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { removeFavorite } from '../../store/slices/favoritesSlice';

const FavoritesTab = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { items: favorites, status, error } = useSelector((state) => state.favorites);

  const handleRemoveFavorite = (e, productId) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    if (currentUser) {
      dispatch(removeFavorite({ userId: currentUser.uid, productId }));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>

      {status === 'loading' && <p>Loading favorites...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      
      {status === 'succeeded' && favorites.length === 0 && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">Your favorite products will appear here.</p>
          <Link to="/catalog" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Browse Products
          </Link>
        </div>
      )}

      {status === 'succeeded' && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="card hover:shadow-lg transition-shadow">
              <Link to={`/product/${product.id}`} className="h-full flex flex-col">
                <div className="relative pb-[100%] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg flex-grow pr-2">{product.name}</h3>
                    <button
                      onClick={(e) => handleRemoveFavorite(e, product.id)}
                      className="text-red-500 hover:text-red-600 focus:outline-none transition-colors flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesTab;
