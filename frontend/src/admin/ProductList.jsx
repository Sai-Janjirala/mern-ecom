import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data.products ?? []);
  }

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    } catch(err) { /* silent */ }
  }

  useEffect(() => { loadProducts(); }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fadeIn">
      {/* ── Header bar ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900">Product List</h2>
          <p className="text-slate-400 text-sm mt-0.5">{products.length} products</p>
        </div>
        <Link to='/admin/add'
          className='px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-bold rounded-xl hover:from-indigo-600 hover:to-violet-600 transition-all shadow-md shadow-indigo-200'>
          + Add Product
        </Link>
      </div>

      {/* ── White table card ── */}
      <div className="bg-white rounded-3xl border border-indigo-50 shadow-xl shadow-indigo-100/50 overflow-hidden">
        <table className="w-full">
          <thead>
            {/* thead uses a subtle lavender-white gradient stripe */}
            <tr className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-indigo-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-indigo-600 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-indigo-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-50">
            {products.map((product, index) => (
              <tr key={product._id}
                className="hover:bg-indigo-50/40 transition-colors duration-150 animate-slideUp"
                style={{ animationDelay: `${index * 0.03}s` }}>
                <td className="px-6 py-4 text-sm font-semibold text-indigo-900">{product.title}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">${product.price}</span>
                </td>
                <td className="px-6 py-4">
                  {/* Stock badge color: emerald (>10), amber (1-10), rose (0) */}
                  <span className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-full ${
                    product.stock > 10 ? 'bg-emerald-100 text-emerald-700' :
                    product.stock > 0  ? 'bg-amber-100 text-amber-700'   :
                    'bg-rose-100 text-rose-700'
                  }`}>{product.stock} in stock</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link to={`/admin/products/edit/${product._id}`}
                    className="inline-flex px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors">
                    Edit
                  </Link>
                  <button onClick={() => deleteProduct(product._id)}
                    className="inline-flex px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-100 rounded-lg hover:bg-rose-200 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList
