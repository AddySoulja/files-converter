import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const userPresent = await User.findOne({ email: req.body.email });
  if (userPresent) {
    res.status(400);
    throw new Error("User already exists");
  }
  const base64Img = req.body.photo;
  const base64Data = base64Img.replace(/^data:image\/\w+;base64,/, "");
  const contentType = base64Img.match(/^data:image\/\w+;base64,/);
  const buffer = Buffer.from(base64Data, "base64");

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    photo: {
      name: req.body.username,
      data: buffer,
      contentType: contentType[0],
    },
    password: req.body.password,
  });
  if (!user) {
    res.status(500);
    throw new Error("Failed to register user, Invalid user data");
  }
  res.status(201).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo,
      token: generateToken(user._id),
    },
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  if (req.body.posts) {
    user.posts = req.body.posts;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user._id, { ...user });
  res.status(201).json({
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      photo: user.photo,
      token: generateToken(updatedUser._id),
    },
  });
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
