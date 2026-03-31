import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { Link } from 'react-router';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const loadProducts = async () => {
    try {
      const response = await api.get(`/products?search=${search}&category=${category}`);
      setProducts(Array.isArray(response.data?.products) ? response.data.products : []);
    } catch (error) {
      console.error('Failed to load products', error);
      setProducts([]);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login to add to cart');
      return;
    }

    const res = await api.post('/cart/add', { userId, productId });
    const total = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);

    localStorage.setItem('cartCount', total);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  return (
    <div className='p-6'>
      {/* search */}
      <div className='mb-4 flex gap-3'>
      <input 
      placeholder='Search Products..'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='border py-2 px-3 w-1/2 rounded'
      />
      {/* category */}
      <select 
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className='border px-3 py-2 w-1/2 rounded'
      >
        <option value="">All categories</option>
        <option value="Laptops">Laptops</option>
        <option value="phones">Phones</option>
        <option value="tablets">Tablets</option>

      </select>
      </div>
      {/* Products Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {products.map((product) => (
          <div key={product._id} className='border p-3 rounded shadow hover:shadow-lg transition'>
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-40 object-contain bg-white rounded'
              />
              <h2 className='mt-2 font-semibold text-lg'>{product.title}</h2>
              <p className='text-gray-600'>${product.price}</p>
            </Link>
            <button
              onClick={() => addToCart(product._id)}
              className='mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-700'
            >
              Add to Cart
            </button>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Home;
