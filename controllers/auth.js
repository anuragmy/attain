const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to sign the token
const {
  hashPassword,
  errorHandler,
  compareHashedPassword,
} = require("../utils");
require("dotenv").config();

exports.signUp = (req, res) => {
  const userData = {
    email: req.body.email,
    password: hashPassword(req.body.password),
  };
  console.log(userData);
  const user = new User(userData);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: errorHandler(err),
      });
    }
    // create jwt as user will not sign in again
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //set token as 't' om cookie
    res.cookie("t", token, { expire: new Date() + 9999 });
    // send user and toke to client
    const { _id, email } = user;
    req.user = user;
    return res.status(200).json({
      message: "signed in",
      user: { _id, email },
      token,
    });
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  // check for user exists

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exists",
      });
    }

    // compare password
    req.profile = user;
    const result = compareHashedPassword(password, user.password);
    if (result) {
      // create jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      //set token as 't' om cookie
      res.cookie("t", token, { expire: new Date() + 9999 });
      // send user and toke to client
      const { _id, name, email, roles } = user;
      req.user = user;
      return res.status(200).json({ token, user: { _id, email, name, roles } });
    } else {
      return res.status(401).json({
        err: "Password mismatch",
      });
    }
  });
};

exports.signOut = async (req, res) => {
  res.clearCookie("t");
  res.status(200).json({
    message: "sign out success",
  });
};

exports.isAuth = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];

  if (!token)
    return res.status(401).json({
      err: "Access denied",
    });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(user, "err", err);
    if (err)
      return res.status(403).json({
        error: "invalid token",
      });
    res.user = user;
    next();
  });
};
