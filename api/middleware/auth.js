const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

/*
 * JWT Authentication
 */

passport.use(new passportJwt.Strategy(
  {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_TOKEN,
    algorithms: ['HS256'],
  },
  (payload, done) => {
    const id = payload.sub;
    User.findById(id)
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(error => {
        done(error, false)
      });
  }
));

function issueJwt(req, res, next) {
  const { user } = req;
  req.token = jwt.sign(
    { username: user.username },
    process.env.JWT_TOKEN,
    {
      expiresIn: '30m',
      subject: user._id.toString(),
    }
  );
  next();
}

/*
 * Local authentication
 */

passport.use(User.createStrategy());

function registerUser(req, res, next) {
  const user = new User({
    username: req.body.username,
  });

  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error);
      return;
    }

    req.user = user;
    next();
  });
}

module.exports = {
  initialize: passport.initialize.bind(passport),
  verify: passport.authenticate('jwt', { session: false }),
  authoriseUser: passport.authenticate('local', { session: false }),
  registerUser,
  issueJwt
}
