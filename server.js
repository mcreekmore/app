const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messages = require("./routes/api/messages");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

// mongodb connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use messages route
app.use("/api/messages", messages);

port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  return res.send("Hello world!");
});

app.listen(port, () => console.log(`Server started on Port ${port}`));
