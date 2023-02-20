const jwt = require("jsonwebtoken");

const generateToken = async (username, id) => {
  jwt.sign(
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

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
};

module.exports = {
  generateToken,
};
