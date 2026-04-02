import {useState} from 'react'
import {useNavigate, Link} from 'react-router'
import axiosInstance from '../api/axiosInstance.js';

const Login = () => {
  const [form,setForm] = useState({email:"",password:""});
  const [msg,setMsg] = useState("");
  const navigate = useNavigate();

  // ── Updates form state for either email or password field ──
  const handleChange = (e)=>{
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ── Sends credentials to API, stores token + userId, redirects home ──
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axiosInstance.post("/auth/login", form)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      setMsg(res.data.msg || "Login successful");
      setTimeout(() => navigate("/"), 1000)
    }
    catch(err){
      setMsg(err.response?.data?.msg || "An error occurred");
    }
  }

  return (
    /* ── Split layout: decorative gradient panel (left) + form (right) ──
       On mobile the gradient panel is hidden and only the form shows.     */
    <div className='min-h-screen flex animate-fadeIn'>

      {/* ── Left decorative panel (hidden on mobile) ──
          Vibrant gradient background with brand text and floating shapes.  */}
      <div className='hidden md:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 relative overflow-hidden'>
        {/* Decorative blurred circles for depth */}
        <div className='absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl' />
        <div className='absolute bottom-16 right-8 w-56 h-56 bg-violet-300/20 rounded-full blur-3xl' />
        <div className='relative text-center text-white'>
          <h2 className='text-4xl font-extrabold mb-4'>Welcome Back!</h2>
          <p className='text-indigo-200 text-lg leading-relaxed max-w-xs'>
            Sign in to explore curated products and continue your shopping journey.
          </p>
          <div className='mt-10 grid grid-cols-2 gap-3 text-sm text-indigo-100 text-left'>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Fast checkout</div>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Order history</div>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Saved addresses</div>
            <div className='flex items-center gap-2'><span className='text-emerald-300'>✓</span> Exclusive deals</div>
          </div>
        </div>
      </div>

      {/* ── Right: login form panel ── */}
      <div className='flex-1 flex items-center justify-center px-6 py-12 bg-white'>
        <div className='w-full max-w-sm'>
          {/* ShopVibe logo at top of form */}
          <Link to="/" className='text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent block mb-8'>
            ShopVibe
          </Link>

          <h2 className='text-3xl font-extrabold text-indigo-900 mb-1'>Sign In</h2>
          <p className='text-slate-400 text-sm mb-8'>Enter your credentials to continue</p>

          {/* Status message pill */}
          {msg && (
            <div className={`mb-5 text-sm font-medium px-4 py-3 rounded-xl ${
              msg.toLowerCase().includes('success')
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>{msg}</div>
          )}

          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Email */}
            <div>
              <label className='block text-sm font-semibold text-indigo-800 mb-1.5'>Email</label>
              <input name='email' type='email' placeholder='you@example.com' value={form.email} onChange={handleChange}
                className='w-full px-4 py-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200'
                required />
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm font-semibold text-indigo-800 mb-1.5'>Password</label>
              <input name='password' type='password' placeholder='••••••••' value={form.password} onChange={handleChange}
                className='w-full px-4 py-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200'
                required />
            </div>

            {/* Submit */}
            <button type='submit'
              className='w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-200 text-sm'>
              Sign In →
            </button>
          </form>

          <p className='mt-6 text-center text-sm text-slate-400'>
            No account?{' '}
            <Link to='/signup' className='text-indigo-600 font-semibold hover:text-indigo-700 transition-colors'>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
