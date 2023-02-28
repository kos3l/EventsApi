const User = require("../models/schemas/user.ts");
import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { IUserModel } from "../models/interfaces/IUser";

const createNewUser = async (user: ICreateUserDTO): Promise<IUserModel> => {
  const newUser: Promise<IUserModel> = await User.create(user).then(
    (data: IUserModel) => {
      return data;
    }
  );
  return newUser;
};

const getUserById = async (id: string): Promise<IUserModel> => {
  const user: Promise<IUserModel> = await User.findById(id).then(
    (data: IUserModel) => {
      return data;
    }
  );

  return user;
};

const getUserByEmail = async (email: string): Promise<IUserModel> => {
  const user: Promise<IUserModel> = await User.findOne({
    email: email,
  });
  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
