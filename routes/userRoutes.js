const express = require("express");
const router = express.Router();
const { loginForm, login, registerForm, register } = require("../controllers/userController");

router.get("/login", loginForm);
router.post("/login", login);

router.get("/register", registerForm);
router.post("/register", register);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;