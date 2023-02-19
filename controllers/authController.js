const authService = require("../services/auth.service");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

const register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const emailExist = await authService.isEmailTaken(req.body.email);
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Email is wrong" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Wrong password" });
  }

  const token = jwt.sign(
    // payload
    {
      name: user.name,
      id: user._id,
    },
    // TOKEN_SECRET
    process.env.TOKEN_SECRET,
    // EXPIRATION TIME
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
};

module.exports = {
  register,
  login,
};
