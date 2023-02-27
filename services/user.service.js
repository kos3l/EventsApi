const User = require("../models/schemas/user.ts");

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
  const user1 = await User.findOne({ email: email });
  return user1;
};

module.exports = {
  createNewUser,
  getUserById,
  getUserByEmail,
};
