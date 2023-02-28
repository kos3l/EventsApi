const User = require("../models/schemas/user.ts");
import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { IUser } from "../models/interfaces/IUser";
import { HydratedDocument } from "mongoose";

const createNewUser = async (
  user: ICreateUserDTO
): Promise<HydratedDocument<IUser>> => {
  const newUser: Promise<HydratedDocument<IUser>> = await User.create(
    user
  ).then((data: IUser) => {
    return data;
  });
  return newUser;
};

const getUserById = async (id: string): Promise<HydratedDocument<IUser>> => {
  const user: Promise<HydratedDocument<IUser>> = await User.findById(id).then(
    (data: HydratedDocument<IUser>) => {
      return data;
    }
  );

  return user;
};

const getUserByEmail = async (
  email: string
): Promise<HydratedDocument<IUser>> => {
  const user: Promise<HydratedDocument<IUser>> = await User.findOne({
    email: email,
  });
  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
