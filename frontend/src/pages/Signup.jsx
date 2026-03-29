import { useState } from "react";
import api from "../api/axios.js";

export default function Signup() {
  const [form,setForm ] = useState({
      name:"",
      email:"",
      password:""
    })
    const [msg,setMsg] =  useState("");

    const handleChange = (e) =>{

    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account </h2>
          {msg && (
            <div className="mb-4 text-center text-sm text-blue-600 font-medium">
              {msg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4" >
          <input name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
           />
           
          </form>
         </div>
      </div>
    )
}