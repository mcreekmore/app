const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messages = require("./routes/api/messages");
const user = require("./routes/api/users");

const app = express();

// middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
// email
app.use(express.static("src"));
app.use(express.urlencoded({ extended: true }));

// DB config
const db = require("./config/keys").mongoURI;

// mongodb connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use messages route
app.use("/api/messages", messages);
// Use user route
app.use("/api/users", user);

port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  return res.send("Hello world!");
});

app.listen(port, () => console.log(`Server started on Port ${port}`));
