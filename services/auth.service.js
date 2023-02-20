const userService = require("../services/user.service");

const register = async (user) => {
  const newUser = await userService.createNewUser(user);
  return newUser;
};

const login = async (id) => {
  const user = await userService.getUserById(id);
  return user;
};

module.exports = {
  register,
  login,
};
