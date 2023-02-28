import { IUser, IUserModel } from "../interfaces/IUser";
import { Model } from "mongoose";

export type UserModel = Model<IUser, {}, IUserModel>;
