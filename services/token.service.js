const jwt = require("jsonwebtoken");

const generateToken = async (username, id) => {
  return jwt.sign(
    // payload
    {
      name: username,
      id: id,
    },
    // TOKEN_SECRET
    process.env.TOKEN_SECRET,
    // EXPIRATION TIME
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = {
  generateToken,
};
