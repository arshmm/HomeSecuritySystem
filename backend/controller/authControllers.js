const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/userRoutes");
//--------------------------------------------------------------------------
module.exports.signup_post = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const admin = await Admin.create(data);
    const token = createToken(admin._id);
    console.log("token crearted and signed in");
    res.status(201).json({ id: admin._id, token });
  } catch (er) {
    const errors = handleError(er);
    res.status(400).send(errors);
  }
};
//--------------------------------------------------------------------------
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    console.log("token crearted and loggeded in");
    res.status(200).json({ id: admin._id, token });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json(errors);
  }
};
//--------------------------------------------------------------------------
module.exports.logout_get = (req, res) => {
  console.log("token removed and logged out");
  res.json({ id: null, token: null });
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
    errors = "That email is already taken";
    return errors;
  }
  //validation errors
  if (err.message.includes("Admin validation failed")) {
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
