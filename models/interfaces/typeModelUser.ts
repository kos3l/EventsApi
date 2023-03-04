import { Schema, model, Model } from "mongoose";
import { UserDocument } from "../documents/UserDocument";
import { UserModel } from "../interfaces/UserModel";
export type UserTypeModel = Model<UserDocument, {}, UserModel>;
