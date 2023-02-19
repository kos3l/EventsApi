const User = require("../models/user");

const register = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};

const login = async (id) => {
  const user = await User.findById(id).then((data) => {
    return data;
  });

  return user;
};

const isEmailTaken = async (email) => {
  const foundEmail = await User.findOne({ email: email });
  return foundEmail;
};

module.exports = {
  register,
  login,
  isEmailTaken,
};
