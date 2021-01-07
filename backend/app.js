var express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
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
app.use("/unknown_images", express.static("unknown_images"));
app.use(morgan("tiny"));
//=====================================================================================================================
//Routes
//=====================================================================================================================
app.use("/api/user/", checkAuth, userRoutes);
app.use("/api/detection/", detectionRoutes);
app.use("/api/auth/", authRoutes);
//-------------------------------------------------------------------------------------------------------------------
app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("Server running");
});
