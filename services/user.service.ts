const User = require("../models/schemas/user.ts");
import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { UserModel } from "../models/types/UserModel";

const createNewUser = async (user: ICreateUserDTO): Promise<UserModel> => {
  const newUser: Promise<UserModel> = await User.create(user).then(
    (data: UserModel) => {
      return data;
    }
  );
  return newUser;
};

const getUserById = async (id: string): Promise<UserModel> => {
  const user: Promise<UserModel> = await User.findById(id).then(
    (data: UserModel) => {
      return data;
    }
  );

  return user;
};

const getUserByEmail = async (email: string): Promise<UserModel> => {
  const user: Promise<UserModel> = await User.findOne({ email: email });
  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
