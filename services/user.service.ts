import { UserDocument } from "../models/documents/UserDocument";
import { UserModel } from "../models/interfaces/UserModel";
const User: UserModel = require("../models/schemas/user.ts");
import { ICreateUserDTO } from "../models/dto/ICreateUserDTO";

const createNewUser = async (user: ICreateUserDTO): Promise<UserDocument> => {
  const newUser: UserDocument = await User.create(user).then(
    (data: UserDocument) => {
      return data;
    }
  );
  return newUser;
};

const getUserById = async (id: string): Promise<UserModel | null> => {
  const user: UserModel | null = await User.findById(id);
  debugger;
  return user;
};

const getUserByEmail = async (email: string): Promise<UserModel | null> => {
  const user: UserModel | null = await User.findOne({
    email: email,
  });

  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
