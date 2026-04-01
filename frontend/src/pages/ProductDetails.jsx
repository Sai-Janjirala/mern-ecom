import {useState,useEffect} from 'react'
import api from '../api/axios.js'
import { useParams, Link } from 'react-router'

const ProductDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Fetches a single product by its route param ID ──
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data?.product ?? null);
      } catch (error) {
        console.error('Failed to load product', error);
        setProduct(null);
      } finally { setLoading(false); }
    }
    loadProduct();
  }, [id]);

  // ── Adds this product to the user's cart via API ──
  const addToCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) { alert('Please login to add to cart'); return; }
    const res = await api.post('/cart/add', { userId, productId: id });
    const total = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', total);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  // ── Loading skeleton with pulse effect ──
  if (loading) {
    return (
      <div className='max-w-5xl mx-auto px-6 py-8 animate-fadeIn'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1 h-80 bg-indigo-50 rounded-2xl animate-pulse' />
          <div className='flex-1 space-y-4 pt-4'>
            <div className='h-6 bg-indigo-50 rounded-xl w-1/3 animate-pulse' />
            <div className='h-8 bg-indigo-50 rounded-xl w-3/4 animate-pulse' />
            <div className='h-4 bg-indigo-50 rounded-lg w-full animate-pulse' />
            <div className='h-4 bg-indigo-50 rounded-lg w-2/3 animate-pulse' />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-[60vh] flex flex-col items-center justify-center animate-fadeIn'>
        <div className='w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className='text-indigo-900 font-bold text-lg'>Product not found</p>
        <Link to="/" className='mt-3 text-indigo-500 text-sm font-semibold hover:text-indigo-700 transition-colors'>← Back to products</Link>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn'>

      {/* ── Breadcrumb ── */}
      <nav className='mb-6 text-sm font-medium'>
        <Link to="/" className='text-indigo-400 hover:text-indigo-600 transition-colors'>Home</Link>
        <span className='mx-2 text-slate-300'>›</span>
        <span className='text-indigo-900'>{product.title}</span>
      </nav>

      {/* ── Two-column layout: image left, details right ── */}
      <div className='flex flex-col md:flex-row gap-10 bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-100/50 overflow-hidden'>

        {/* Image area on a gradient lavender background */}
        <div className='flex-1 bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center p-10'>
          <img src={product.image} alt={product.title} className='w-full max-h-80 object-contain' />
        </div>

        {/* Product info */}
        <div className='flex-1 p-8 flex flex-col justify-center'>
          {/* Category badge */}
          {product.category && (
            <span className='inline-block w-fit px-3 py-1 text-xs font-bold text-violet-600 bg-violet-100 rounded-full mb-4 uppercase tracking-wider'>
              {product.category}
            </span>
          )}

          <h1 className='text-2xl sm:text-3xl font-extrabold text-indigo-900 leading-tight'>{product.title}</h1>

          <p className='text-slate-500 mt-3 leading-relaxed text-sm'>{product.description}</p>

          {/* Price */}
          <div className='mt-6 flex items-center gap-3'>
            <span className='text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent'>
              ${product.price}
            </span>
          </div>

          {/* Add to Cart */}
          <button onClick={addToCart}
            className='mt-6 w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.77 2.348-1.862l1.677-7.104H6.106" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
