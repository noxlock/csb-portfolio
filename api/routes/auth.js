const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verify, issueJwt, authoriseUser, registerUser } =
  require('../middleware/auth');
require('dotenv').config();

router.post('/verify', verify, function(req, res) {
  const { user } = req;
  res.json({ user });
});

router.post('/login', authoriseUser, issueJwt, function(req, res) {
  const { token } = req
  res.json({ token });
});

router.post('/register', registerUser, issueJwt, function(req, res) {
  const { token } = req
  res.json({ token });
});

module.exports = router;
