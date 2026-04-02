import { useEffect, useState } from "react";
import axiosInstance from '../api/axiosInstance.js';
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', description: '', price: '', category: '', image: '', stock: '' });
  const allowedFields = ['title', 'description', 'price', 'category', 'image', 'stock'];

  const loadProduct = async () => {
    const res = await axiosInstance.get('/products');
    const product = (res.data.products ?? []).find((p) => p._id === id);
    if (product) {
      setForm({
        title: product.title ?? '', description: product.description ?? '',
        price: product.price ?? '', category: product.category ?? '',
        image: product.image ?? '', stock: product.stock ?? ''
      });
    }
  }

  const handleChange = (e) => {
    if (allowedFields.includes(e.target.name)) setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => { loadProduct(); }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/products/${id}`, form);
    alert('Product updated successfully');
    navigate('/admin/products');
  }

  /* Human-readable labels for each field */
  const fieldLabels = {
    title: "Product Title", description: "Description",
    price: "Price ($)", category: "Category", image: "Image URL", stock: "Stock Quantity"
  };

  const inputClass = "w-full px-4 py-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-indigo-900 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 text-sm";

  return (
    <div className="max-w-lg mx-auto px-4 py-10 animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-indigo-900">Edit Product</h2>
        <p className="text-slate-400 text-sm mt-1">Update the product details below</p>
      </div>
      <div className="bg-white border border-indigo-50 shadow-xl shadow-indigo-100/50 rounded-3xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(form).map((key) => (
            allowedFields.includes(key) &&
            <div key={key}>
              <label className="block text-xs font-bold text-indigo-700 mb-1.5 uppercase tracking-wide">{fieldLabels[key]}</label>
              <input type="text" name={key} value={form[key]} onChange={handleChange} placeholder={fieldLabels[key]} className={inputClass} />
            </div>
          ))}
          <button type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-violet-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-200 text-sm">
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
