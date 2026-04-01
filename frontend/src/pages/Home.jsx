import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { Link } from 'react-router';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // ── Fetches products; re-runs whenever search text or category changes ──
  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(Array.isArray(response.data?.products) ? response.data.products : []);
    } catch (error) {
      console.error('Failed to load products', error);
      setProducts([]);
    }
  };

  useEffect(() => { loadProducts(); }, [search, category]);

  // ── Adds product to cart via API and fires cartUpdated event for navbar badge ──
  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) { alert('Please login to add to cart'); return; }
    const res = await api.post('/cart/add', { userId, productId });
    const total = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', total);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  return (
    /* ── Page wrapper: light lavender-white bg, fades in on mount ── */
    <div className='min-h-screen px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn'>

      {/* ── Hero section: gradient headline + description ── */}
      <div className='text-center mb-10'>
        <span className='inline-block px-4 py-1.5 text-xs font-semibold text-violet-700 bg-violet-100 rounded-full mb-4 tracking-wide'>
          New Arrivals ✦ Trending
        </span>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-indigo-900 leading-tight'>
          Discover{' '}
          <span className='bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent'>
            Premium
          </span>{' '}
          Products
        </h1>
        <p className='mt-3 text-slate-500 text-base max-w-md mx-auto'>
          Curated collection of the finest gadgets & accessories
        </p>
      </div>

      {/* ── Search + Category bar ──
          White card floats on the lavender background with soft shadow */}
      <div className='mb-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-lg shadow-indigo-100 border border-indigo-50'>
        {/* Search with magnifying glass icon */}
        <div className='relative flex-1'>
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full pl-10 pr-4 py-2.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-sm'
          />
        </div>

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='px-4 py-2.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition-all duration-200'
        >
          <option value="">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="phones">Phones</option>
          <option value="tablets">Tablets</option>
        </select>
      </div>

      {/* ── Product grid ──
          Cards use white bg with colorful top accent borders and hover shadow
          Grid: 1 col  → 2 sm → 3 lg → 4 xl */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        {products.map((product, index) => (
          <div
            key={product._id}
            className='group bg-white border border-indigo-50 rounded-2xl overflow-hidden shadow-md shadow-indigo-100/60 hover:shadow-xl hover:shadow-indigo-200/60 hover:-translate-y-1.5 transition-all duration-300 animate-slideUp'
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Product image on a soft lavender bg */}
            <Link to={`/product/${product._id}`}>
              <div className='bg-gradient-to-br from-indigo-50 to-violet-50 p-5 border-b border-indigo-50'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-44 object-contain group-hover:scale-105 transition-transform duration-500'
                />
              </div>
              <div className='p-4 pb-2'>
                <h2 className='font-bold text-indigo-900 truncate text-sm group-hover:text-indigo-600 transition-colors duration-200'>
                  {product.title}
                </h2>
                <p className='mt-1 text-xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent'>
                  ${product.price}
                </p>
              </div>
            </Link>

            {/* Add to cart — full-width gradient button inside card */}
            <div className='px-4 pb-4'>
              <button
                onClick={() => addToCart(product._id)}
                className='w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.97] transition-all duration-200 shadow-md shadow-indigo-200'
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Empty state ── */}
      {products.length === 0 && (
        <div className='text-center py-24'>
          <div className='w-20 h-20 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <p className='text-indigo-900 text-lg font-semibold'>No products found</p>
          <p className='text-slate-400 text-sm mt-1'>Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
};

export default Home;
