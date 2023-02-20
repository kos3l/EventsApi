const User = require("../models/user");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

module.exports = {
  getUserByEmail,
};
