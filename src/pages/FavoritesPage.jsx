import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromFavorites } from '../store/slices/favoritesSlice'

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.items)

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't added any items to your favorites yet.</p>
          <Link
            to="/catalog"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.price}€</p>
            <div className="flex justify-between items-center">
              <button
                className="text-primary hover:text-primary/80 transition-colors"
                onClick={() => dispatch(removeFromFavorites(product.id))}
              >
                Remove from Favorites
              </button>
              <Link
                to={`/product/${product.id}`}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
