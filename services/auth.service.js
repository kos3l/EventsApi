const userService = require("../services/user.service");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const user = require("../models/user");

const register = async (userBody) => {
  const { error } = registerValidation(userBody);
  if (error) {
    throw new ApiError(httpStatus[400], error.details[0].message);
  }
  const emailExist = await userService.getUserByEmail(userBody.email);
  if (emailExist) {
    throw new ApiError(httpStatus[400], "Email already exists");
  }
  const newUser = await userService.createNewUser(userBody);
  return newUser;
};

const login = async (userBody) => {
  const { error } = loginValidation(userBody);
  if (error) {
    throw new ApiError(httpStatus[400], error.details[0].message);
  }
  const fetchedUser = await userService.getUserByEmail(userBody.email);

  if (!fetchedUser) {
    throw new ApiError(httpStatus[400], "Email is wrong");
  }

  const validPassword = await fetchedUser.comparePassword(userBody.password);

  if (!validPassword) {
    throw new ApiError(httpStatus[400], "Wrong password");
  }
  return fetchedUser;
};

module.exports = {
  register,
  login,
};
