const User = require("../models/user");

const createNewUser = async (user) => {
  const newUser = await User.create(user).then((data) => {
    return data;
  });
  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findById(id).then((data) => {
    return data;
  });

  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
