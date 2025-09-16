const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/authMiddleware");

// 👉 Renderiza página de login
const loginForm = (req, res) => {
  res.render("login", { error: null });
};

// 👉 Renderiza página de registro
const registerForm = (req, res) => {
  res.render("register", { error: null });
};

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

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const newPassword = bcrypt.hashSync(password, 10);

    await User.create({
      name,
      username,
      password: newPassword,
    });

    res.redirect("/login"); // 👈 depois de registrar, redireciona pro login
  } catch (error) {
    res.render("register", { error: "Erro ao registrar usuário" });
  }
};

module.exports = {
  loginForm,
  login,
  registerForm,
  register,
};