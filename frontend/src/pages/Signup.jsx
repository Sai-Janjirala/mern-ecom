import { useState } from "react";
import { Link } from "react-router";
import api from "../api/axios.js";

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // ── Updates form state for any changed field ──
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Sends signup request; shows colored message on success or error ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", form);
      setIsError(false);
      setMsg(response.data.msg || "Account created successfully!");
    } catch(err) {
      setIsError(true);
      if (!err.response || typeof err.response.data === "string") {
        setMsg("Cannot connect to server. Start the backend on port 5001.");
        return;
      }
      setMsg(err.response.data.msg || "An error occurred");
    }
  }

  const inputClass = "w-full px-4 py-3 bg-violet-50/60 border border-violet-100 rounded-xl text-indigo-900 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-200";

  return (
    /* ── Mirror of Login: gradient panel on the right this time for variety ── */
    <div className='min-h-screen flex animate-fadeIn'>

      {/* ── Left: signup form panel ── */}
      <div className='flex-1 flex items-center justify-center px-6 py-12 bg-white'>
        <div className='w-full max-w-sm'>
          <Link to="/" className='text-2xl font-extrabold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent block mb-8'>
            ShopVibe
          </Link>

          <h2 className='text-3xl font-extrabold text-indigo-900 mb-1'>Create Account</h2>
          <p className='text-slate-400 text-sm mb-8'>Join ShopVibe and start shopping today</p>

          {/* Status message pill */}
          {msg && (
            <div className={`mb-5 text-sm font-medium px-4 py-3 rounded-xl ${
              isError
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>{msg}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-indigo-800 mb-1.5">Full Name</label>
              <input name="name" placeholder="John Doe" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-800 mb-1.5">Email</label>
              <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-800 mb-1.5">Password</label>
              <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} className={inputClass} required />
            </div>
            <button type="submit"
              className="w-full py-3 font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl hover:from-violet-600 hover:to-purple-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-violet-200 text-sm">
              Create Account →
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 font-semibold hover:text-violet-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right decorative panel (hidden on mobile) ── */}
      <div className='hidden md:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 p-12 relative overflow-hidden'>
        <div className='absolute top-8 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl' />
        <div className='absolute bottom-12 left-8 w-64 h-64 bg-fuchsia-300/20 rounded-full blur-3xl' />
        <div className='relative text-center text-white'>
          <h2 className='text-4xl font-extrabold mb-4'>Join ShopVibe</h2>
          <p className='text-violet-200 text-lg leading-relaxed max-w-xs'>
            Create your account in seconds and unlock an exclusive shopping experience.
          </p>
          <div className='mt-10 flex flex-col gap-3 text-sm text-violet-100 text-left'>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Free registration, no credit card needed</div>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Track all your orders in real-time</div>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Save multiple delivery addresses</div>
          </div>
        </div>
      </div>
    </div>
  )
}
