const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password not valid"],
    minlength: [6, "Minimum length should be 6 characters"],
  },
});

//Mongodb Hook
AdminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//login method
AdminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
