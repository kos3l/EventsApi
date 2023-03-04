const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { UserDocument } from "../models/documents/UserDocument";
import { UserModel } from "../models/interfaces/UserModel";

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const savedUser: HydratedDocument<UserDocument, UserModel> =
      await authService.register(req.body);
    return res.json({ error: null, data: savedUser });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const loggedInUser: HydratedDocument<UserDocument, UserModel> =
      await authService.login(req.body);
    const username: string =
      loggedInUser.firstName + " " + loggedInUser.lastName;

    const token: string = await tokenService.generateToken(
      username,
      loggedInUser._id
    );

    return res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  register,
  login,
};
