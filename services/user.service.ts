const User = require("../models/schemas/user.ts");
import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { IUser } from "../models/interfaces/IUser";

const createNewUser = async (user: ICreateUserDTO): Promise<IUser> => {
  const newUser: Promise<IUser> = await User.create(user).then(
    (data: IUser) => {
      return data;
    }
  );
  return newUser;
};

const getUserById = async (id: string): Promise<IUser> => {
  const user: Promise<IUser> = await User.findById(id).then((data: IUser) => {
    return data;
  });

  return user;
};

const getUserByEmail = async (email: string): Promise<IUser> => {
  const user: Promise<IUser> = await User.findOne({ email: email });
  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
