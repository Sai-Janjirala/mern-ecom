import {useState} from 'react'
import axiosInstance from '../api/axiosInstance.js';
import { useNavigate } from 'react-router'

const AddProduct = () => {
  const [form, setForm] = useState({
    title:"", description: '', price: '', category: '', image: '', stock: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/products', form)
      alert('Product added successfully')
      navigate('/admin/products')
    } catch(err) {
      alert(err.response?.data?.msg || 'Failed to add product');
    }
  }

  /* Human-readable labels — shown as <label> above each input */
  const fieldLabels = {
    title: "Product Title", description: "Description",
    price: "Price ($)", category: "Category", image: "Image URL", stock: "Stock Quantity"
  };

  const inputClass = "w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-sm";

  return (
    <div className='max-w-lg mx-auto px-4 py-10 animate-fadeIn'>
      <div className="mb-8">
        <h2 className='text-2xl font-extrabold text-indigo-900'>Add New Product</h2>
        <p className="text-slate-400 text-sm mt-1">Fill in the details to create a new listing</p>
      </div>
      <div className='bg-white border border-indigo-50 shadow-xl shadow-indigo-100/50 rounded-3xl p-6'>
        <form onSubmit={handleSubmit} className='space-y-5'>
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className='block text-xs font-bold text-indigo-700 mb-1.5 uppercase tracking-wide'>{fieldLabels[key]}</label>
              <input name={key} value={form[key]} onChange={handleChange} placeholder={fieldLabels[key]} className={inputClass} />
            </div>
          ))}
          <button type='submit'
            className='w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-200 text-sm'>
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
