import React from 'react';

const FavoritesTab = () => {
  const favoriteProducts = [
    {
      id: 1,
      name: 'Brit Care',
      description: 'Premium Adult M food for adult dogs of medium breeds',
      price: '159.00 €',
      image: 'https://www.brit-petfood.com/dam/jcr:98f73f18-0462-41c7-8693-173b1767551e/brit-care-dog-adult-m.png'
    },
    {
      id: 2,
      name: 'Vitamax',
      description: 'Vitamins and minerals for cats',
      price: '115.18 €',
      image: 'https://vitamax.com.ua/image/cache/catalog/vitamax-cat-vit-60-500x500.jpg'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map(product => (
          <div key={product.id} className="card hover:shadow-lg transition-shadow">
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
                <button className="text-red-500 hover:text-red-600 focus:outline-none transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{product.price}</span>
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
    </div>
  );
};

export default FavoritesTab;
