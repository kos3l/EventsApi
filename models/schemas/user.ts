import { Schema, model } from "mongoose";
import { UserModel } from "../types/UserModel";
import { IUser, IUserModel } from "../interfaces/IUser";

const bcrypt = require("bcrypt");

let userSchema = new Schema<IUser, UserModel, IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    birthdate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.method(
  "comparePassword",

  async function (password: string) {
    console.log(this);
    return bcrypt.compare(password, this.password);
  }
);

module.exports = model<IUserModel>("user", userSchema);
