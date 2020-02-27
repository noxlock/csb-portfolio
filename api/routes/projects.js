const express = require('express');
const router = express.Router();

const projects = [
  {
    title: "Portfolio Website",
  },
  {
    title: "Python Command Line App",
  },
  {
    title: "Rails Two-Sided Marketplace",
  },
  {
    title: "React + Node API Project",
  },
];

router.get('/projects', function(req, res) {
  res.json(projects);
});

module.exports = router;
