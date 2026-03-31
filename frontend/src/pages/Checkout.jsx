import {useState,useEffect} from 'react'
import api from '../api/axios.js'
import {useNavigate} from 'react-router'

const Checkout = () => {
  const userId = localStorage.getItem('userId');
  const [address,setAddress] = useState([]);
  const [selectedAddress,setSelectAddress] = useState(null);
  const [cart,setCart] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!userId){
      navigate('/login');
      return;
    }
    api.get(`/cart/${userId}`).then((res)=>{
      setCart(res.data.cart);
    })
    api.get(`/address/${userId}`).then((res)=>{
      setAddress(res.data.address);
      setSelectAddress(res.data[0]); // Default to first address
    })
  },[])
  if(!cart){
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum,i) => sum + i.product.price , 0
  )

  const placeOrder = async  ()=> {
    if(!selectedAddress){
      alert('Please select an address');
      return;
    }
    const res = await api.post('/order/place', {userId, address: selectedAddress});
    navigate(`/order/place${res.data.order._id}`); 
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
      <h2 className='font-semibold mb-2'>Select Address</h2>
      {
        address.map((addr)=>{
          <label key={addr._id} className='block border p-3 rounded cursor-pointer'>
            <input
            type='radio'
            name = 'address'
            checked={selectAddress?._id === addr._id}
            onChange={() => setSelectAddress(addr)}
            className='mr-2'
            />
            <strong>{addr.fullName}</strong>
            <p className='text-sm'>
              {addr.addressLine},{addr.city},{addr.state} - {addr.pincode} </p>
              <p className='text-sm'>
                {addr.phone}
              </p>
          </label>
        })
      }
      <h2 className='font-semibold mb-2'>Order Summary</h2>
      <p>Total Amount : ${total}</p>
        <button
        onClick={placeOrder}
        className='mt-4 w-full bg-green-500 text-white p-2 rounded'>
          Place Order (COD)
        </button>
    </div>
  )
}

export default Checkout
