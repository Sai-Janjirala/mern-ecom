import {Link,useNavigate} from 'react-router'
import {useState,useEffect} from 'react'
import api from '../api/axios.js'

const Navbar = () => {

  const navigate = useNavigate();
  const [cartCount,setCartCount] = useState(0);
  const userId = localStorage.getItem('userId');

  // ── Fetches cart item count; re-runs whenever cartUpdated event fires ──
  useEffect(()=>{
      const loadCart = async ()=>{
        if(!userId) return setCartCount(0);
        try {
          const res = await api.get(`/cart/${userId}`);
          const total = (res.data.cart?.items || []).reduce(
            (sum, item) => sum + item.quantity, 0
          );
          setCartCount(total);
        } catch { setCartCount(0); }
      }
      loadCart();
      window.addEventListener("cartUpdated", loadCart);
      return ()=> window.removeEventListener("cartUpdated", loadCart);
  },[userId])

  // ── Clears storage and redirects to login on logout ──
  const logout = ()=>{
    localStorage.clear();
    setCartCount(0);
    navigate('/login');
  }

  return (
    /* ── Sticky white navbar with subtle shadow and bottom border ──
       bg-white/90     → near-opaque white so content behind is barely visible
       backdrop-blur   → slight blur for visual depth when content scrolls under
       shadow-sm       → thin drop shadow for separation from page content     */
    <nav className='sticky top-0 z-50 flex justify-between items-center px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-sm'>

      {/* ── Brand logo: gradient indigo→violet text ── */}
      <Link to='/' className='text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-violet-500 transition-all duration-300'>
        ShopVibe
      </Link>

      {/* ── Right-side controls ── */}
      <div className='flex gap-2 items-center'>

        {/* ── Cart icon with red item count badge ── */}
        <Link to="/cart" className='relative p-2.5 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors duration-200'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.77 2.348-1.862l1.677-7.104H6.106" />
          </svg>
          {cartCount > 0 && (
            <span className='absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-xs font-bold w-5 h-5 flex justify-center items-center rounded-full shadow-md shadow-rose-300'>
              {cartCount}
            </span>
          )}
        </Link>

        {/* ── Auth controls ──
            Logged out → Login (outlined) + Sign Up (solid gradient)
            Logged in  → Logout (rose outlined)                       */}
        {!userId ? (
          <>
          <Link to="/login" className='px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all duration-200'>
            Login
          </Link>
          <Link to='/signup' className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all duration-200 shadow-md shadow-indigo-200'>
            Sign Up
          </Link>
          </>
        ) : (
          <button onClick={logout} className='px-4 py-2 text-sm font-semibold text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-50 transition-all duration-200'>
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
