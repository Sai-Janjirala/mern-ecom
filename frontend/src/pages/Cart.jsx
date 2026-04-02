import axiosInstance from '../api/axiosInstance.js';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ── Fetches the user's cart items from the API ──
  const loadCart = async () => {
    if (!userId) { setCartItems([]); setLoading(false); return; }
    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      setCartItems(res.data.cart?.items || []);
    } catch { setCartItems([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadCart(); }, []);

  // ── Removes a single item from the cart by productId ──
  const removeItem = async (productId) => {
    await axiosInstance.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  // ── Updates quantity; removes item if quantity hits 0 ──
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) { await removeItem(productId); return; }
    await axiosInstance.post(`/cart/update`, { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4 animate-fadeIn">
        {[1,2,3].map(i => <div key={i} className="h-24 bg-indigo-50 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.quantity * (item.productId?.price || 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">

      {/* ── Page heading ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.77 2.348-1.862l1.677-7.104H6.106" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900">Your Cart</h1>
        <span className="text-sm text-slate-400 font-medium">({cartItems.length} items)</span>
      </div>

      {/* ── Empty cart state ── */}
      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-indigo-50 shadow-lg shadow-indigo-50">
          <div className="w-20 h-20 mx-auto mb-5 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.77 2.348-1.862l1.677-7.104H6.106" />
            </svg>
          </div>
          <p className="text-indigo-900 text-lg font-bold">Your cart is empty</p>
          <p className="text-slate-400 text-sm mt-1 mb-6">Looks like you haven't added anything yet</p>
          <Link to="/" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md shadow-indigo-200 text-sm">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* ── Cart item cards ── */}
          {cartItems.map((item, index) => (
            <div
              key={item.productId?._id || item.productId}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-indigo-50 rounded-2xl shadow-md shadow-indigo-50 gap-4 animate-slideUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Product image + info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-indigo-100">
                  <img src={item.productId?.image} alt={item.productId?.title} className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-indigo-900">{item.productId?.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">${(item.productId?.price || 0).toFixed(2)} each</p>
                </div>
              </div>

              {/* Controls: qty stepper + subtotal + remove */}
              <div className="flex items-center gap-5">
                {/* Quantity pill: − / count / + */}
                <div className="flex items-center bg-indigo-50 rounded-xl overflow-hidden border border-indigo-100">
                  <button onClick={() => updateQty(item.productId?._id || item.productId, item.quantity - 1)}
                    className="px-3 py-2 text-indigo-500 hover:bg-indigo-100 font-bold text-lg transition-colors duration-150">−</button>
                  <span className="px-3 py-2 text-sm font-bold text-indigo-800 min-w-[2rem] text-center">{item.quantity}</span>
                  <button onClick={() => updateQty(item.productId?._id || item.productId, item.quantity + 1)}
                    className="px-3 py-2 text-indigo-500 hover:bg-indigo-100 font-bold text-lg transition-colors duration-150">+</button>
                </div>

                {/* Subtotal */}
                <p className="text-sm font-extrabold text-indigo-800 min-w-[70px] text-right">
                  ${(item.quantity * (item.productId?.price || 0)).toFixed(2)}
                </p>

                {/* Remove button */}
                <button onClick={() => removeItem(item.productId?._id || item.productId)}
                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-150" title="Remove">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* ── Order summary card ── */}
          <div className="mt-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
            <div className="flex justify-between items-center mb-5">
              <span className="text-indigo-200 font-medium">Order Total</span>
              <span className="text-3xl font-extrabold">${total.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate("/checkout-address")}
              className="w-full py-3.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 active:scale-[0.98] transition-all duration-200 text-sm shadow-lg">
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
