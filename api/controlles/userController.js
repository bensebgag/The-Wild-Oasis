import { catchAsync } from "../Util/catchAsync.js";
import User from "../models/user.model.js";
export const createUser = catchAsync(async (req, res) => {
  const { fullName, email, password, repeatPassword } = req.body;

  const newUser = await User.create({
    fullName,
    email,
    password,
    repeatPassword,
  });
  res.status(200).json({
    status: "success",
    newUser,
  });
});
export const getuser = (req, res) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};
