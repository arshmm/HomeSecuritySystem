var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("ello");
});

app.post("/", (req, res) => {
  const x = req.body;
  console.log("req avi gai");
  console.log(x);
  res.json("well done boii");
});

app.listen(process.env.PORT || 5000, process.env.IP, () => {
  console.log("dun dun dun");
});
