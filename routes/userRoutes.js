const express = require("express");
const router = express.Router();
const { loginForm, login, registerForm, register } = require("../controllers/userController");

router.get("/login", loginForm);
router.post("/login", login);

router.get("/register", registerForm);
router.post("/register", register);

module.exports = router;