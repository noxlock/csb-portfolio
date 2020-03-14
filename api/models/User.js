const mongoose = require('./init');
const passportLocalMongoose = require('passport-local-mongoose');

const schema = new mongoose.Schema({
  username: String,
  email: String,
});

schema.plugin(passportLocalMongoose, {
  usernameField: 'username',
  session: false,
});

const User = mongoose.model('User', schema);

module.exports = User;
