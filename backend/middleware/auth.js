const jwt = require("jsonwebtoken");
const config = require("config");

// Bad Token Model
const BadToken = require("../models/BadToken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  // try this ...
  // if (!token || token == null)
  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  BadToken.findOne({ token }).then(BadToken => {
    if (BadToken) {
      return res
        .status(401)
        .json({ msg: "Token has been blacklisted: Unauthorized" });
    } else {
      try {
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        // Add user from payload
        req.user = decoded;
        next();
      } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "Token is not valid" });
      }
    }
  });
}

module.exports = auth;
