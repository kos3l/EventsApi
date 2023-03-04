import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { HydratedDocument } from "mongoose";
import { UserDocument, UserMethods } from "../models/documents/UserDocument";
import { UserModel } from "../models/interfaces/UserModel";
const User: HydratedDocument<
  UserDocument,
  UserModel
> = require("../models/schemas/user.ts");

const createNewUser = async (
  user: ICreateUserDTO
): Promise<HydratedDocument<UserDocument, UserMethods> | null> => {
  const newUser: HydratedDocument<UserDocument, UserMethods> | null =
    await User.create(user);
  return newUser;
};

const getUserById = async (
  id: string
): Promise<HydratedDocument<UserDocument, UserMethods> | null> => {
  const user: HydratedDocument<UserDocument, UserMethods> | null =
    await User.findById(id);
  return user;
};

const getUserByEmail = async (
  email: string
): Promise<HydratedDocument<UserDocument, UserMethods> | null> => {
  const user: HydratedDocument<UserDocument, UserMethods> | null =
    await User.findOne({
      email: email,
    });

  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
