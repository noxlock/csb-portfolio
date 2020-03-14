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
          done(null, {
            _id: user._id,
            email: user.email,
            roles: payload.roles,
          });
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
    {
      username: user.username,
      roles: rolesForUser(user),
    },
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

function rolesForUser(user) {
  let roles = [ 'projects:read' ]
  if (/@coderacademy.edu.au$/.test(user.email)) {
    roles.push('projects:write')
  }
  return roles;
}


function authoriseRole(role) {
  return function(req, res, next) {
    const user = req.user;
    const roles = user.roles;

    if (roles.indexOf(role) === -1) {
      let error = new Error(`User must have role ${role}`);
      error.status = 401; // Authorised
      next(error);
    } else {
      next();
    }
  }
}

module.exports = {
  initialize: passport.initialize.bind(passport),
  verify: passport.authenticate('jwt', { session: false }),
  authoriseUser: passport.authenticate('local', { session: false }),
  authoriseRole,
  registerUser,
  issueJwt
}
