const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
import { Request, Response } from "express";
const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const savedUser = await authService.register(req.body);
    return res.json({ error: null, data: savedUser._id });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const loggedInUser = await authService.login(req.body);
    const username = loggedInUser.firstName + " " + loggedInUser.lastName;
    const token = await tokenService.generateToken(username, loggedInUser._id);

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
