const userService = require("../services/user.service");
const { registerValidation } = require("../validations/auth.validation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const register = async (user) => {
  const { error } = registerValidation(user);
  if (error) {
    throw new ApiError(httpStatus[400], error.details[0].message);
  }
  const emailExist = await userService.getUserByEmail(user.email);
  if (emailExist) {
    throw new ApiError(httpStatus[400], "Email already exists");
  }
  const newUser = await userService.createNewUser(user);
  return newUser;
};

const login = async (id) => {
  const user = await userService.getUserById(id);
  return user;
};

module.exports = {
  register,
  login,
};
