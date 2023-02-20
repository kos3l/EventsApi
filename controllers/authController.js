const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");

const register = async (req, res) => {
  try {
    const savedUser = await authService.register(req.body);
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const loggedInUser = await authService.login(req.body);
    const username = loggedInUser.firstName + " " + loggedInUser.lastName;
    const token = await tokenService.generateToken(username, loggedInUser._id);

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  register,
  login,
};
