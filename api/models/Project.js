const mongoose = require('./init');

const Project = mongoose.model('Project', {
  title: String,
  isCompleted: Boolean,
})

module.exports = Project
