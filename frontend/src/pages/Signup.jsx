import { useState } from "react";
import api from "../api/axios.js";

export default function Signup() {
  const [form,setForm ] = useState({
      name:"",
      email:"",
      password:""
    })
    const [msg,setMsg] =  useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = (e) =>{
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const response = await api.post("/auth/signup",form);
        setIsError(false);
        setMsg(response.data.msg || "User created successfully");
      }
      catch(err){
        setIsError(true);
        if (!err.response || typeof err.response.data === "string") {
          setMsg("Cannot connect to server. Start the backend on port 5001 and try again.");
          return;
        }

        setMsg(err.response.data.msg || "An error occurred");
      }

    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account </h2>
          {msg && (
            <div className={`mb-4 text-center text-sm font-medium ${isError ? "text-red-600" : "text-blue-600"}`}>
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
           <input name="email"
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
           />
           <input name="password"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
           />
           <button
           type="submit"
           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
           >
            Sign Up
           </button>
           
          </form>
         </div>
      </div>
    )
}
