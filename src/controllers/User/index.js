require("dotenv").config();
const { userModel } = require("../../models");
const { encrypt, compare } = require("../../helpers/handleBcrypt");
//const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, lastname, email, password, identity } = req.body;

    //check if mail or identity exists in db
    let isMailExist = await userModel.find({ email: email });
    let isIdExist = await userModel.find({ identity: identity });

    if (isMailExist[0] || isIdExist[0]) {
      res.status(406).send("This user is already on db");
    }
    //encrypt password
    const passwordHash = await encrypt(password);

    const newUser = await userModel
      .create({
        name: name,
        lastname: lastname,
        email: email,
        password: passwordHash,
        identity: identity,
      })
      .then(function (user) {
        res.status(202).send({ data: [user], success: true });
      });
  } catch (error) {
    res.status(404).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.find({ email: email });
    if (user) {
      const checkPassword = await compare(password, user[0].password);
      if (checkPassword) {
        res.status(200).send({ data: user, success: true });
      } else {
        res.status(400).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to login" });
  }
};

module.exports = {
  register,
  login,
};
