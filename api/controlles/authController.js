import User from "../models/user.model.js";
import { ApiError } from "../Util/apiError.js";
import { catchAsync } from "../Util/catchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_JWT, {
    expiresIn: process.env.EXPIRESIN_JWT,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(async function (req, res) {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});
export const login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ApiError("please provide email or password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new ApiError("incorrect password or email ", 401));

  createSendToken(user, 200, res);
});

export const logout = catchAsync(async function (req, res) {
  res.clearCookie("token").status(200).json({ Message: "Logout successful" });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new ApiError("The user belonging to this token no longer exists.", 401)
    );
  }

  req.user = currentUser;

  next();
});

export const isAuthenticated = catchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(400).json({
      status: "faild",
      user: null,
      isAuthenticated: false,
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(400).json({
      status: "faild",
      user: null,
      message: "you are not sgin up",
      isAuthenticated: false,
    });
  }

  res.status(200).json({
    status: "success",
    user: req.user,
    isAuthenticated: true,
  });
});
