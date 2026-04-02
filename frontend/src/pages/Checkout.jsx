import { useState, useEffect } from "react";
import axiosInstance from '../api/axiosInstance.js';
import { useNavigate } from "react-router";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    axiosInstance.get(`/cart/${userId}`).then((res) => setCart(res.data.cart));
    axiosInstance.get(`/address/${userId}`).then((res) => {
      const addresses = res.data.addresses || [];
      setAddress(addresses);
      setSelectAddress(addresses[0] || null);
    });
  }, [navigate, userId]);

  // ── Loading skeleton ──
  if (!cart) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4 animate-fadeIn">
        {[1,2].map(i => <div key={i} className="h-24 bg-indigo-50 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => sum + item.quantity * (item.productId?.price || 0), 0);

  const placeOrder = async () => {
    if (!selectedAddress) { alert("Please select an address"); return; }
    const res = await axiosInstance.post("/order/place", { userId, address: selectedAddress });
    navigate(`/order-success/${res.data.order._id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-8">Checkout</h1>

      {/* ── Address Selection ── */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-indigo-900">Delivery Address</h2>
        </div>

        {address.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl p-4">
            No saved address found. Please add one to continue.
          </div>
        ) : (
          <div className="space-y-3">
            {address.map((addr) => (
              <label key={addr._id}
                className={`block p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedAddress?._id === addr._id
                    ? 'bg-indigo-50 border-indigo-400 shadow-md shadow-indigo-100'
                    : 'bg-white border-indigo-100 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input type='radio' name='address' checked={selectedAddress?._id === addr._id}
                    onChange={() => setSelectAddress(addr)} className='mt-1 accent-indigo-600' />
                  <div>
                    <strong className="text-indigo-900 font-bold">{addr.fullName}</strong>
                    <p className='text-sm text-slate-500 mt-1'>{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className='text-xs text-indigo-400 mt-0.5 font-medium'>{addr.phone}</p>
                  </div>
                  {selectedAddress?._id === addr._id && (
                    <span className="ml-auto text-xs font-bold text-indigo-500 bg-indigo-100 px-2 py-1 rounded-full">Selected</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── Order Summary card with gradient ── */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
        <h2 className="text-base font-bold text-indigo-100 mb-4">Order Summary</h2>
        <div className="flex justify-between items-center mb-6 border-t border-indigo-400/40 pt-4">
          <span className="text-indigo-200">Total Amount</span>
          <span className="text-3xl font-extrabold">${total.toFixed(2)}</span>
        </div>
        <button onClick={placeOrder}
          className='w-full py-3.5 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 active:scale-[0.98] transition-all duration-200 text-sm'>
          Place Order (Cash on Delivery)
        </button>
      </div>
    </div>
  );
};

export default Checkout;
