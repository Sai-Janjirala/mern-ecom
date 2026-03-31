import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//signup User
export const signupUser = async (req,res) =>{
  try{
    const {name,email,password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({ msg: "User already exists" });
    }
    // hash password 
    const hashPassword = await bcrypt.hash(password,10);

    // create new user
    await User.create({
      name,
      email,
      password: hashPassword,
    })

    res.status(201).json({ msg: "User created successfully" });
  } catch(err) {
    res.status(500).json({ msg: "Server error" });
  }
}


//Login User

export const loginUser = async(req,res) => {
  try{
    const {email,password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({ msg: "User not found" });
    }
    // compare password
    const match = await bcrypt.compare(password,user.password);
    if(!match){
      return res.status(400).json({ msg: "Invalid password" });
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "77777d" });
    res.status(200).json({
       msg: "Login successful",
        token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
      });
  }
  catch(err){
    res.status(500).json({ msg: "Server error" });
  }
}
