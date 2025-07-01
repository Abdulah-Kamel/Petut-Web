import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner pt-6 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-4">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Link to="/catalog" className="text-sm text-neutral hover:text-primary">
              Catalog
            </Link>
            <Link to="/search" className="text-sm text-neutral hover:text-primary">
              Search
            </Link>
            <Link to="/favorites" className="text-sm text-neutral hover:text-primary">
              Favorites
            </Link>
            <Link to="/profile" className="text-sm text-neutral hover:text-primary">
              Profile
            </Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center mb-2">
              <span className="text-lg font-bold text-primary">PET<span className="text-neutral">.CARE</span></span>
            </div>
            <p className="text-xs text-gray-500">Taking care of your pet</p>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} PET.CARE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer