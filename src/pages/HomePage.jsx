import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../store/slices/catalogSlice";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../store/slices/cartSlice";
import heroDog from "../assets/banners/hero-dog.png"
const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.catalog);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

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
            <div className="md:w-1/2 max-md:order-last mb-8 md:mb-0">
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
            <div className="md:w-1/2 max-md:order-first lg:h-[500px] md:h-auto flex justify-center">
              <img
                src={heroDog}
                alt="Happy dog"
                className="max-w-full h-auto rounded-lg"
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
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
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
                className="w-full h-full group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Electronics</p>
          </Link>
          <Link to="/category/jewelery" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
                alt="Jewelery"
                className="w-full h-full group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Jewelery</p>
          </Link>
          <Link to="/category/men's-clothing" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                alt="Men's Clothing"
                className="w-full h-full group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <p className="text-center mt-2 font-medium">Men's Clothing</p>
          </Link>
          <Link to="/category/women's-clothing" className="block group">
            <div className="aspect-square bg-primary-light rounded-lg flex items-center justify-center p-4">
              <img
                src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
                alt="Women's Clothing"
                className="w-full h-full group-hover:scale-110 transition-transform object-contain"
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
