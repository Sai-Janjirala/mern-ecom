import {useState,useEffect} from 'react'
import api from '../api/axios.js'
import { useParams } from 'react-router'


const ProductDetails = () => {
  const {id} = useParams();
  const [product , setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data?.product ?? null);
      } catch (error) {
        console.error('Failed to load product', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className='p-6 text-center'>Loading...</div>;
  }

  if (!product) {
    return <div className='p-6 text-center'>Product not found.</div>;
  }

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <img src={product.image} alt={product.title} className='w-full h-40 object-contain bg-white' />
      <h1 className='text-2xl font-bold mt-4'>{product.title}</h1>
      <p className='text-gray-700 mt-2'>{product.description}</p>
      <p className='text-xl font-semibold mt-4'>Price: ${product.price}</p>

      <button className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetails
