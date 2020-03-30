const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messages = require("./routes/api/messages");
const user = require("./routes/api/users");
const locations = require("./routes/api/locations");
const config = require("config");
// const https = require("https");
// const http = require("http");
const fs = require("fs");

// SSL certs
// const options = {
//   key: fs.readFileSync("./certs/domain.key"),
//   cert: fs.readFileSync("./certs/domain.crt")
// };

const app = express();

// middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
// email
app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));

// DB config
const db = config.get("mongoURI");
//const db = require("./config/keys").mongoURI;

// mongodb connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// fixes deprecation warning
mongoose.set("useFindAndModify", false);

// Use messages route
app.use("/api/messages", messages);
// Use user route
app.use("/api/users", user);
// Use auth route
app.use("/api/auth", require("./routes/api/auth"));

// MOVES
// Use locations route
app.use("/api/locations", locations);

port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  return res.send("Hello world!");
});

app.listen(port, () => console.log(`Server started on Port ${port}`));

// http
//   .createServer(app)
//   .listen(80, () => console.log("Server started on port 80"));
// https
//   .createServer(options, app)
//   .listen(port, () => console.log("Server started on port 443"));
