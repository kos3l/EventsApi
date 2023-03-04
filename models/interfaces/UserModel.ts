import { UserDocument } from "../documents/UserDocument";
import { Model } from "mongoose";

export interface UserModel extends Model<UserDocument> {
  comparePassword(password: string): Promise<string>;
}
