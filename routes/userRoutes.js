const { Router } = require('express');
const { register, login } = require('../controllers/userController');

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});


module.exports = router;
