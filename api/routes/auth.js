const express = require('express');
const router = express.Router();
const { verify } = require('../middleware/auth');

router.post('/verify', verify, function(req, res) {
  const { user } = req;
  res.json({ user });
});

module.exports = router;
