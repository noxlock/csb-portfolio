const jwt = require('jsonwebtoken');
require('dotenv').config();

function verify(req, res, next) {
  const token = req.headers.authorization.split(' ').pop();
  jwt.verify(token, process.env.JWT_TOKEN, function(err, payload) {
    if (err) {
      res.status(401).send(err)
    } else {
      req.user = payload;
      next();
    }
  });
}

function issueJwt(req, res, next) {
  const { user } = req;
  req.token = jwt.sign(
    user,
    process.env.JWT_TOKEN,
    { expiresIn: '1m' }
  );
  next();
}

function authoriseUser(req, res, next) {
  const { username, password } = req.body;
  if (username == 'betty' && password == 'password1') {
    req.user = { id: 666, name: 'betty' }
    next();
  } else {
    res.status(401).end();
  }
}

function registerUser(req, res, next) {
  const { username } = req.body;
  req.user = { id: 666, name: username };
  next();
}

module.exports = {
  verify,
  authoriseUser,
  registerUser,
  issueJwt
}
