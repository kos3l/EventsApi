import { Document } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: Date;
}
