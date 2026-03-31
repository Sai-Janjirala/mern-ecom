import {Link,useNavigate} from 'react-router'
import {useState,useEffect} from 'react'
import api from '../api/axios.js'

const Navbar = () => {

  const navigate = useNavigate();
  const [cartCount,setCartCount] = useState(0);
  const userId = localStorage.getItem('userId');
  useEffect(()=>{
      const loadCart = async ()=>{
        if(!userId) return setCartCount(0);

        try {
          const res = await api.get(`/cart/${userId}`);
          const total = (res.data.cart?.items || []).reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          setCartCount(total);
        } catch (error) {
          setCartCount(0);
        }
      }
      loadCart();
      window.addEventListener("cartUpdated",loadCart);
      return ()=>{
        window.removeEventListener("cartUpdated",loadCart);
      }
  },[userId])

  const logout = ()=>{
    localStorage.clear();
    setCartCount(0);
    navigate('/login');
  }
  return (
    <div className='flex justify-betweenp-4 shadow'>
      <Link to='/' className='font-bold text-xl'>Store</Link>
      <div className='flex gap-4 items-center'>
        <Link to="/cart" className='relative text-xl' >
        🛒
        {
          cartCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex justify-center items-center rounded-full'>
            {cartCount}
            
          </span>
          )
        }
        </Link>
        {
          !userId ? (
            <>
            <Link to="/login" className='text-lg' >Login</Link>
            <Link to='/signup'>Sign Up</Link>
            </>
          ) : (
            <button onClick={logout} className='text-lg'>Logout</button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
