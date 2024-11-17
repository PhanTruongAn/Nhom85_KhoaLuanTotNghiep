"use strict";

require("dotenv").config;
var jwt = require("jsonwebtoken");
var jwt_secret = process.env.JWT_SECRET;
var jwt_expire = process.env.JWT_EXPIRE;
var createToken = function createToken(payload) {
  try {
    var token = jwt.sign(payload, jwt_secret, {
      expiresIn: jwt_expire
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
// Decode Token
var decodeToken = function decodeToken(token) {
  try {
    var data = jwt.decode(token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Verify Token
var verifyToken = function verifyToken(token) {
  try {
    var isVerified = jwt.verify(token, jwt_secret);
    return isVerified;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createToken: createToken,
  decodeToken: decodeToken,
  verifyToken: verifyToken
};