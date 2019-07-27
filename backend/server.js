const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

PORT = process.env.PORT || 8080;

app.get("/", function(req, res) {
  return res.send("Hello world");
});

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
