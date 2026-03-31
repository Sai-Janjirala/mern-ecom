import { useEffect,useState } from "react";
import api from "../api/axios.js";
import { useNavigate,useParams } from "react-router";

const EditProduct = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const [form,setForm] = useState({
    title:'',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });

  const allowedFields = ['title', 'description', 'price', 'category', 'image', 'stock'];

  const loadProduct = async () =>{
    const res = await api.get('/products');
    const product = (res.data.products ?? []).find((p) => p._id === id);
    if (product) {
      setForm({
        title: product.title ?? '',
        description: product.description ?? '',
        price: product.price ?? '',
        category: product.category ?? '',
        image: product.image ?? '',
        stock: product.stock ?? ''
      });
    }
  }

  const handleChange = (e) => {
    if (allowedFields.includes(e.target.name)) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
  };

  useEffect(()=>{
    loadProduct();
  }, [id])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await api.put(`/products/${id}`,form);
    alert('Product updated successfully');
    navigate('/admin/products');
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form 
      onSubmit={handleSubmit}
      className="space-y-3"
      >
        {
          Object.keys(form).map((key) =>(
            allowedFields.includes(key) && 
            <input 
            key={key}
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            />
          ))
        }
        <button
        type="submit"
        className="w-full bg-blue-500 text-white"
        >
          Update Products
        </button>
      </form>
    </div>
  )
}

export default EditProduct
