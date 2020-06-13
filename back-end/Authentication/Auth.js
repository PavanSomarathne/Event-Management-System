require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const accessTokenSecret = process.env.TOKEN_SECRET;
  if (!accessTokenSecret) {
    return res.sendStatus(401);
  }
  const token = req.headers.token;

  const verified = jwt.verify(token, accessTokenSecret);
  console.log("token : " + verified);
  req.user = verified;
  next();
};

module.exports = authenticateJWT;
