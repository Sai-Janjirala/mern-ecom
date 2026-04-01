import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

const CheckoutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Saves the address via API then navigates to order checkout ──
  const saveAddress = async () => {
    await api.post("/address/add", { ...form, userId });
    navigate("/checkout");
  };

  const fieldLabels = {
    fullName: "Full Name", phone: "Phone Number", addressLine: "Address Line",
    city: "City", state: "State", pincode: "PIN Code",
  };

  const inputClass = "w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-sm";

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">

      {/* ── Page heading with location icon ── */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 bg-indigo-100 rounded-2xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-indigo-900">Delivery Address</h1>
        <p className="text-slate-400 text-sm mt-1">Where should we deliver your order?</p>
      </div>

      {/* ── White form card ── */}
      <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-100/50 p-6">
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["fullName","phone"].map((key) => (
              <div key={key}>
                <label className="block text-xs font-bold text-indigo-700 mb-1.5 uppercase tracking-wide">{fieldLabels[key]}</label>
                <input name={key} value={form[key]} placeholder={fieldLabels[key]} onChange={handleChange} className={inputClass} />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-bold text-indigo-700 mb-1.5 uppercase tracking-wide">{fieldLabels.addressLine}</label>
            <input name="addressLine" value={form.addressLine} placeholder="Street, apartment, unit, etc." onChange={handleChange} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["city","state","pincode"].map((key) => (
              <div key={key}>
                <label className="block text-xs font-bold text-indigo-700 mb-1.5 uppercase tracking-wide">{fieldLabels[key]}</label>
                <input name={key} value={form[key]} placeholder={fieldLabels[key]} onChange={handleChange} className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={saveAddress}
          className="w-full mt-6 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-200 text-sm">
          Save & Continue →
        </button>
      </div>
    </div>
  );
};

export default CheckoutAddress;
