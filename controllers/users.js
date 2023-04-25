const { request, response } = require("express");
const bcryptjs = require("bcrypt");

const User = require("../models/usuario");

// GET /users: Retrieve a list of all users. The list should be returned in JSON format.
const getUsers = async (req, res) => {
  const { limit = 5, from = 0, ...data } = req.query;
  const [total, usuarios, generalFilter] = await Promise.all([
    // Cuenta cuantos datos guardados hay
    User.countDocuments(),
    // Filtra segun el query, con skip dice desde donde y limit dice cuantos
    User.find()
      //skip saltea y limit da la cantidad
      .skip(Number(from))
      .limit(Number(limit)),
    User.find(data),
  ]);

  res.json({
    total,
    usuarios,
    generalFilter,
  });
};

// GET /users/:id: Retrieve a single user by ID. The user should be returned in JSON format.
const getUserId = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json(user);
};

// POST /users: Create a new user. The request body should contain the user details in JSON format.
const postUsers = async (req, res) => {
  const { name, mail, password } = req.body;

  const newUser = new User({ name, mail, password });

  if (password) {
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);
  }

  console.log(newUser);

  await newUser.save();

  res.json({
    newUser,
  });

  //   userDB.push([
  //     {
  //       id: userDB.length + 1,
  //       name,
  //       mail,
  //       password,
  //     },
  //   ]);

  //   res.json({
  //     name,
  //     mail,
  //     password,
  //   });
};

// PUT /users/:id: Update a single user by ID. The request body should contain the updated user details in JSON format.
const putUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const actualizacion = await User.findByIdAndUpdate(id, data, { new: true });
  res.json(actualizacion);
};

// DELETE /users/:id: Delete a single user by ID.
const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const borrar = await User.findByIdAndDelete(id);
  res.json(borrar);
};

module.exports = {
  getUsers,
  getUserId,
  postUsers,
  putUsers,
  deleteUsers,
};
