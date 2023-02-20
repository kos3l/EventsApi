const authService = require("../services/auth.service");
const tokenService = require("../services/token.service");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await authService.getUserByEmail(req.body.email);
  if (emailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }
  try {
    const savedUser = await authService.register(req.body);
    res.json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const user = await authService.getUserByEmail(req.body.email);
  if (!user) {
    return res.status(400).json({ error: "Email is wrong" });
  }
  const validPassword = await user.comparePassword(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(400).json({ error: "Wrong password" });
  }
  await tokenService.generateToken(user.name, user._id);
};

module.exports = {
  register,
  login,
};
