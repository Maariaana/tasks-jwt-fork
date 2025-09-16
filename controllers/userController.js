const User = require("../models/User");
const bcrypt = require("bcrypt");
const {generateToken} = require('../middlewares/authMiddleware')

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.render("login", { error: "Usuário não encontrado" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.render("login", { error: "Senha inválida" });
    }

    const token = generateToken(user);

    // salvar token em cookie
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/tasks");
  } catch (error) {
    res.render("login", { error: "Erro ao fazer login" });
  }
};

const register = async(req, res) => {
  try {
    const { name, username, password } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);

    const user = await User.create(
      {
        name,
        username,
        password: newPassword
      }
    );

    res.status(201).send({
      user: {
        id: user.id,
        name: user.name,
        username: user.username
      }
    });


  } catch (error) {
    res.status(500).send({
      error: 'Error registering user',
      details: error,
    });
  }
};

module.exports = {
  login,
  register,
};
