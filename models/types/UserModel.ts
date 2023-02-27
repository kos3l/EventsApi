import { IUser, IUserMethods } from "../interfaces/IUser";
import { Model } from "mongoose";

export type UserModel = Model<IUser, {}, IUserMethods>;
