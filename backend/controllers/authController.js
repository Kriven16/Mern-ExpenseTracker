import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    user.password=null
    res.status(200).json({user,token : generateToken(user._id)})
  } catch (error) {
    console.log("Error in loginUser :", error.message);
    res.status(500).json({ message: "Internal Server Error " });

  }
};

export const registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;
  //VALIDATION FOR MISSING FIELDS
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //CHECKING IF USER EXISTS
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });
    newUser.password = null;
    res.status(201).json({ newUser, token: generateToken(newUser._id) });
  } catch (error) {
    console.log("Error in registerUser :", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        if(!user){return res.status(404).json({message:"User not found"})}
    } catch (error) {
     res.status(500).json({message:"Error registering user",error:error.message})
        
    }
};
