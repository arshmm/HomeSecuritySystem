const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/userRoutes");
//--------------------------------------------------------------------------
module.exports.signup_post = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await User.create(data);
    const token = createToken(user._id);
    res.status(201).json({ user: user._id, token });
  } catch (er) {
    const errors = handleError(er);
    res.status(400).json(errors);
  }
};
//--------------------------------------------------------------------------
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};
//--------------------------------------------------------------------------
module.exports.logout_get = (req, res) => {
  res.json({ token: "" });
};
//--------------------------------------------------------------------------

//Error Handler
const handleError = (err) => {
  let errors = { email: "", password: "" };
  //login errors
  if (err.message === "Incorrect email") {
    errors.email = "Incorrect email";
  }
  if (err.message === "Incorrect password") {
    errors.password = "Incorrect password";
  }

  //signup errors
  //duplicate errors
  if (err.code === 11000) {
    errors.email = "That email is already taken";
    return errors;
  }
  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
      console.log(errors);
    });
  }
  return errors;
};

//Token function
const age = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "hackerman me is very", { expiresIn: age });
};
