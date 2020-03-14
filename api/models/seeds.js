const Project = require('./Project');
const User = require('./User');


Project.create([
  {
    title: "Portfolio Website",
    isCompleted: false,
  },
  {
    title: "Python Command Line App",
    isCompleted: true,
  },
  {
    title: "Rails Two-Sided Marketplace",
    isCompleted: true,
  },
  {
    title: "React + Node API Project",
    isCompleted: false,
  },
]);

User.register(
  {
    username: 'betty',
    email: 'betty@coderacademy.edu.au'
  },
  'password1'
)

User.register(
  {
    username: 'sam',
    email: 'sam@google.com'
  },
  'password1'
)
