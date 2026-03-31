import api from "../api/axios.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // load cart Data
  const loadCart = async () => {
    if (!userId) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const res = await api.get(`/cart/${userId}`);
      setCartItems(res.data.cart?.items || []);
    } catch (error) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart();
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  //update item quantity
  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId);
      return;
    }

    await api.post(`/cart/update`, { userId, productId, quantity });
    loadCart();
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.productId?.price || 0),
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">Your cart is empty</div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.productId?._id || item.productId}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div className="flex items-center gap-4 ">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.title}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productId?.title}
                  </h2>
                  <p className="text-gray-600">
                    ${(item.productId?.price || 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => updateQty(item.productId?._id || item.productId, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.productId?._id || item.productId, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <div>
                <p className="font-semibold">
                  ${(item.quantity * (item.productId?.price || 0)).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId?._id || item.productId)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          </div>
          <button
          onClick={()=> navigate("/checkout-address")}
          className="bg-blue-500 p-5 text-white rounded w-full ">
            proceed to checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
