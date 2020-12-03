var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const detectionRoutes = require("./routes/detectionRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkAuth, checkUser } = require("./middleware/authMiddleware");
var app = express();
//-----------------------------------------------------------------------------------------------------------------
mongoose
  .connect(
    "mongodb+srv://userArsh:helloworld@123@cluster0.pg8he.mongodb.net/minorproject?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cookieParser());
app.use("/Images", express.static("Images"));
//=====================================================================================================================
//Routes
//=====================================================================================================================
app.get("/hello", checkAuth, (req, res) => {
  console.log("request aayi");
  const hello = {
    name: "arsh",
    age: "600",
  };
  res.json(hello);
});
app.use("/api/user/", checkAuth, userRoutes);
app.use("/api/detection/", detectionRoutes);
app.use("/api/auth/", authRoutes);
//-------------------------------------------------------------------------------------------------------------------
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("dun dun dun");
});
