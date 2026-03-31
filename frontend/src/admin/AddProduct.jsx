import {useState} from 'react'
import api from '../api/axios.js'
import { useNavigate } from 'react-router'

const AddProduct = () => {

  const [form , setForm] = useState({
    title:"",
    description : '',
    price : '',
    category : '',
    image : '',
    stock: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await api.post('/products',form)
      alert('Product added successfully')
      navigate('/admin/products')
    }
    catch(err){
      alert(err.response?.data?.msg || 'Failed to add product');
    }
  }

  return (
    <div className='max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded'>
      <h2 className='text-2xl font-bold mb-6'>Add new Product</h2>
      <form onSubmit={handleSubmit}
      className='space-y-3'
      >
        {
          Object.keys(form).map((key)=>(
            <input 
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className='w-full p-2 border border-gray-300 rounded'
            />
          ))
        }
        <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>
          Add Product
        </button>

      </form>
    </div>
  )
}

export default AddProduct
