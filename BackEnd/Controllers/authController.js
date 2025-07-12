import User from "../Models/userSchema.js";
import Music from "../Models/musicSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import passport from "passport";

export const signup = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("Email is already registered", 400));
  }

  if(password.length<8) {
    return next(new ErrorHandler("Password must be of 8 digits", 404));
  }

  const user = new User({ username, email });

  try {
    await User.register(user, password);
  } catch (err) {
    return next(new ErrorHandler("Registration failed", 500));
  }

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export const login = catchAsyncErrors((req, res, next) => {
  const { _id, email, username, playlists } = req.user;

  res.status(200).json({
    success: true,
    user: { _id, email, username, playlists },
    message: "User logged in Successfully",
  });
});

export const userExist = catchAsyncErrors((req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
  res.status(200).json({
    success: false,
    user: null,
  });
});

export const logout = catchAsyncErrors((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) return next(new ErrorHandler("Logout failed", 500));
    });
  }

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const fetchMusicData = catchAsyncErrors(async (req, res, next) => {
  const data = await Music.find();

  if (!data || data.length === 0) {
    return next(new ErrorHandler("No music data found", 404));
  }

  res.status(200).json({
    success: true,
    data,
  });
});
