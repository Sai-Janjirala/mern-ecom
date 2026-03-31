import { useEffect,useState } from "react";
import { Link } from "react-router";
import api from "../api/axios.js";

const ProductList = () => {

  const [products , setProducts] = useState([]);

  const loadProducts = async () =>{
    const response = await api.get('/products');
    setProducts(response.data.products ?? []);
  }

  const deleteProduct = async (id) => {
    try{
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully");
      loadProducts();
    }catch(err){
      
    }

  }

  useEffect(()=>{
    loadProducts();
  },[])

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product List</h2>
        <Link to='/admin/add' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Add new product</Link>
      </div>
    <table className="w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-200">
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2">Stock</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
        </tr>
      </thead>
        <tbody>
          {products.map((product)=>(
            <tr key={product._id} className="text-center">
          <td className="border border-gray-200 px-4 py-2">{product.title}</td>
          <td className="border border-gray-200 px-4 py-2">${product.price}</td>
          <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
          <td className="border border-gray-200 px-4 py-2">
            <Link to={`/admin/products/edit/${product._id}`} className="text-bold text-blue-600"> Edit
            </Link>
            <button 
            onClick={()=>deleteProduct(product._id)}
            className=" text-red-500 px-4 py-2 rounded">
            Delete
            </button>
          </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  )
}

export default ProductList
