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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    res.redirect("/login"); // depois do cadastro, vai para tela de login
  } catch (error) {
    console.error("❌ Erro ao registrar usuário:", error); // mostra no terminal
    res.render("register", { error: "Erro ao registrar usuário" });
  }
};


module.exports = {
  loginForm,
  login,
  registerForm,
  register,
};