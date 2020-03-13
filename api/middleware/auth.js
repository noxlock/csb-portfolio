const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new passportJwt.Strategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN,
    algorithms: ['HS256'],
  },
  (payload, done) => {
    const user = payload;
    done(null, user);
  }
));

function issueJwt(req, res, next) {
  const { user } = req;
  req.token = jwt.sign(
    user,
    process.env.JWT_TOKEN,
    { expiresIn: '30m' }
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
  initialize: passport.initialize.bind(passport),
  verify: passport.authenticate('jwt', { session: false }),
  authoriseUser,
  registerUser,
  issueJwt
}
