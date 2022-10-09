import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import genrateToken from "../config/token.js";
import User from "../models/userModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(`Please Fill All details`);
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create User");
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      pic: user.pic,
      isAdmin: user.isAdmin,
      token: genrateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

export const allusers = asyncHandler(async (req,res) => {
  const keyword = req.query.search ? {
    $or :[
      {name : {$regex:req.query.search, $options: "i"}},
      {email: {$regex:req.query.search, $options: "i"}}
    ]
  }: {};

  const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
  res.status(200).json(users);
});