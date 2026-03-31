import Product from "../models/product.js";

//create a new product

export const createProduct = async (req,res) =>{
  try{
    const newProduct = await Product.create(req.body);
    res.status(201).json({ msg: "Product created successfully", product: newProduct });

  }
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
}

//get all products

export const getProducts = async (req,res) =>{
  try{
    const {search,category} = req.query;
    let filter = {};
    if(search){
      filter.title = { $regex: search, $options: 'i' }; // case-insensitive search on title
    }
    if(category){
      filter.category = { $regex: `^${category}$`, $options: 'i' };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ msg: "Products fetched successfully", products });
  }
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
}

export const getProductById = async (req, res) =>{
  try{
    const product = await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({ msg: "Product fetched successfully", product });
  }
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
}

// updated a product

export const updateProduct = async (req,res) =>{
  try{
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ msg: "Product updated successfully", updatedProduct });
  } 
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
}

// delete a product

export const deleteProduct = async (req,res) =>{
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted successfully" });
  }
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
}
