import { useParams } from "react-router"

const OrderSuccess = () => {
  const {id} = useParams();
  const goHome = () => { window.location.href = '/'; }

  return (
    /* ── Centered success card on lavender-white bg ── */
    <div className="max-w-md mx-auto px-4 py-20 text-center animate-fadeIn">
      <div className="bg-white rounded-3xl border border-indigo-50 shadow-2xl shadow-indigo-100/50 p-10">
        {/* Animated checkmark circle */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 animate-pulseGlow">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-indigo-900 mb-2">Order Placed!</h1>
        <p className="text-slate-400 text-sm">Thank you for shopping with ShopVibe 🎉</p>

        {/* Order ID pill */}
        <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-left">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">Order ID</p>
          <p className="font-mono text-sm text-indigo-700 font-bold break-all">{id}</p>
        </div>

        <button onClick={goHome}
          className="mt-6 w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-200 text-sm">
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess