const mongoose = require("mongoose");
const url =
  "mongodb+srv://root:787898@St@democluster.8jyf1.mongodb.net/blogpost-db?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on("open", () => {
  console.log("connected to Database");
});

conn.on("error", () => {
  console.log("could not connect to database");
});
