const User = require("../models/user");

const register = () => {
  return User.find().then((data) => {
    return data;
  });
};

const login = (id) => {
  return User.findById(id).then((data) => {
    return data;
  });
};

module.exports = {
  register,
  login,
};
