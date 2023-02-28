import { Document } from "mongoose";
export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: Date;
}

export interface IUserModel extends IUser {
  comparePassword(password: string): Promise<string>;
}
