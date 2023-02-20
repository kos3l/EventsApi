const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (!user.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  },
});

module.exports = mongoose.model("user", userSchema);
