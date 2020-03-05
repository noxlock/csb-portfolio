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

module.exports = {
  verify
}
