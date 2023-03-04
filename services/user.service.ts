import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";
import { HydratedDocument } from "mongoose";
import { UserDocument } from "../models/documents/UserDocument";
import { UserTypeModel } from "../models/interfaces/typeModelUser";
import { UserModel } from "../models/interfaces/UserModel";
const User: HydratedDocument<
  UserDocument,
  UserTypeModel
> = require("../models/schemas/user.ts");

const createNewUser = async (
  user: ICreateUserDTO
): Promise<HydratedDocument<UserDocument, UserModel> | null> => {
  const newUser: HydratedDocument<UserDocument, UserModel> | null =
    await User.create(user);
  return newUser;
};

const getUserById = async (
  id: string
): Promise<HydratedDocument<UserDocument, UserModel> | null> => {
  const user: HydratedDocument<UserDocument, UserModel> | null =
    await User.findById(id);
  return user;
};

const getUserByEmail = async (
  email: string
): Promise<HydratedDocument<UserDocument, UserModel> | null> => {
  const user: HydratedDocument<UserDocument, UserModel> | null =
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
