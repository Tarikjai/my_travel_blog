const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt'); 
require('dotenv').config();
const passport = require('passport');

// import the schema model from contact model
const User = require('../models/userModel')



const registerUser = asyncHandler(async(req,res)=>{
    const {username, email , password} =  req.body  
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email})
    console.log(userAvailable)
    if (userAvailable){
        res.status(400);
        throw new Error("User already registred");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log("HashedPassword: ",hashedPassword)
    const user= await  User.create({ 
        username,
        email,
        password: hashedPassword,
        isMfaActive: false,
    })

    console.log(`User Created: ${user}`)
    if (user) {
        res.status(201).json({_id: user.id, email: user.email})
    } else {
        res.status(400)
        throw new Error("User data not valid");
    }
})


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // MFA check removed, only standard login will be handled
  return handleStandardLogin(user, res);
});

const handleStandardLogin = (user, res) => {
  const accessToken = jwt.sign(
    {
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION || "1h" }
  );
  return res.status(200).json({ accessToken});
};



const authStatus = async(req,res)=>{
  if (req.user) {
      res.status(200).json({
          message :"User loged in succefully",
          username: req.user.username,
          isMfaActive: req.user.isMfaActive
      })
  } else {
      res.status(401).json({message: "Unauthorizd user"})
  }
}

const logout = async (req, res) => {
  if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user" });
  }
  req.logout((err) => {
      if (err) {
          return res.status(401).json({ message: "User not logged in" });
      }
      res.status(200).json({ message: "Logout successful" });
  });
};


const currentUser = asyncHandler(async(req, res)=>{
    res.json(req.user)
})
module.exports = {registerUser, loginUser, currentUser, authStatus, logout}
