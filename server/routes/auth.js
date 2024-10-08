const express = require('express');
const { register, login } = require('../controllers/auth.js');
const { route } = require('./hotels.js');
const router = express.Router();

router.get('/register',register);
router.get("/login", login);

module.exports = router;