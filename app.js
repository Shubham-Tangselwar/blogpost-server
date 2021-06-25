const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db"); // Database Connection file

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Expose-Headers", "x-token");
  next();
});
// If environment port is set then use that otherwise use 8080
const port = process.env.PORT || 8080;

// transfer request to user route
app.use("/api/v1/user", require("./v-1.0.0/routes/user.route"));
app.use("/api/v1/blog", require("./v-1.0.0/routes/blog.route"));
app.use("/api/v1/auth", require("./v-1.0.0/routes/auth.route"));

app.listen(port, () => {
  console.log("Server started at ", port);
});
