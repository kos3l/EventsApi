const userService = require("../services/user.service");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { ICreateLoginDTO } from "../models/dto/ICreateLoginDTO";
import { UserModel } from "../models/interfaces/UserModel";

const register = async (userBody: ICreateUserDTO): Promise<UserModel> => {
  const { error } = registerValidation(userBody);
  if (error) {
    throw new ApiError(httpStatus[400], error.details[0].message);
  }

  const emailExist: UserModel = await userService.getUserByEmail(
    userBody.email
  );
  if (emailExist) {
    throw new ApiError(httpStatus[400], "Email already exists");
  }
  const newUser: UserModel = await userService.createNewUser(userBody);
  return newUser;
};

const login = async (userBody: ICreateLoginDTO): Promise<UserModel> => {
  const { error } = loginValidation(userBody);
  if (error) {
    throw new ApiError(httpStatus[400], error.details[0].message);
  }

  const fetchedUser: UserModel = await userService.getUserByEmail(
    userBody.email
  );

  if (!fetchedUser) {
    throw new ApiError(httpStatus[400], "Email is wrong");
  }

  const validPassword: string = await fetchedUser.comparePassword(
    userBody.password
  );

  if (!validPassword) {
    throw new ApiError(httpStatus[400], "Wrong password");
  }
  return fetchedUser;
};

module.exports = {
  register,
  login,
};
