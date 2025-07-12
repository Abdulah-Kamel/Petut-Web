import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const FavoritesTab = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.items)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(product => (
          <div key={product.id} className="card hover:shadow-lg transition-shadow">
            <Link to={`/product/${product.id}`} className="h-full flex flex-col">

            <div className="relative pb-[100%] overflow-hidden">
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <button className="text-red-500 hover:text-red-600 focus:outline-none transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesTab;
