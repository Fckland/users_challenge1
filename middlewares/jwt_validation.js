const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/usuario");

const jwt_validator = (req = request, res = response, next) => {
  const { token } = req.headers;

  // try {
  //     jwt.verify(token,process.env.PRIVATEKEY)

  // } catch (error) {
  //     return res.status(401).json({message: 'Token inválido'});

  // }
  next();
};

module.exports = jwt_validator;
