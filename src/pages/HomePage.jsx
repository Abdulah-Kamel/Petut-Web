import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../store/slices/catalogSlice";
import brit_care from "../assets/products/brit-care.jpg";
const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.catalog);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchProductsStart());
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const getBrandFromCategory = (category) => {
          if (category.includes("clothing")) return "FashionBrand";
          if (category === "jewelery") return "LuxuryGems";
          if (category === "electronics") return "Techtronics";
          return "General Goods";
        };

        const formattedProducts = data.map((p) => ({
          id: p.id,
          name: p.title,
          description: p.description,
          price: p.price,
          image: p.image,
          category: p.category,
          brand: getBrandFromCategory(p.category),
        }));
        dispatch(fetchProductsSuccess(formattedProducts));
      } catch (error) {
        dispatch(fetchProductsFailure(error.message));
      }
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [dispatch, products.length]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-light to-secondary rounded-2xl overflow-hidden mb-8">
        <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
                Taking care of <span className="text-primary">your pet</span>
              </h1>
              <p className="text-lg mb-6">
                Find everything your pet needs - from premium food to toys and
                accessories.
              </p>
              <Link to="/catalog" className="btn-primary inline-block">
                Shop Now
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="../assets/hero-dog.png"
                alt="Happy dog"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/catalog" className="text-primary hover:underline">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="card hover:shadow-lg transition-shadow"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative pb-[100%] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="font-semibold text-lg truncate"
                      title={product.name}
                    >
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <span className="badge-secondary whitespace-nowrap">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">
                      ${product.price.toFixed(2)}
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
        )}
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/category/electronics" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
                alt="Electronics"
                className="w-16 h-16 group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Electronics</p>
          </Link>
          <Link to="/category/jewelery" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                alt="Jewelery"
                className="w-16 h-16 group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Jewelery</p>
          </Link>
          <Link to="/category/men's-clothing" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                alt="Men's Clothing"
                className="w-16 h-16 group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Men's Clothing</p>
          </Link>
          <Link to="/category/women's-clothing" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                alt="Women's Clothing"
                className="w-16 h-16 group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Women's Clothing</p>
          </Link>
        </div>
      </section>

      {/* Brands */}
      {/* <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Brands</h2>
        <div className="flex flex-wrap justify-center gap-8 py-4">
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md p-4">
            <img
              src="/src/assets/brands/brit.png"
              alt="Brit"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md p-4">
            <img
              src="/src/assets/brands/royal-canin.png"
              alt="Royal Canin"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md p-4">
            <img
              src="/src/assets/brands/acana.png"
              alt="Acana"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md p-4">
            <img
              src="/src/assets/brands/trixie.png"
              alt="Trixie"
              className="max-w-full max-h-full"
            />
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md p-4">
            <img
              src="/src/assets/brands/tetra.png"
              alt="Tetra"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
