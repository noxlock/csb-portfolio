const express = require('express');
const router = express.Router();

const projects = [
  {
    id: 666,
    title: "Portfolio Website",
    isCompleted: false,
  },
  {
    id: 667,
    title: "Python Command Line App",
    isCompleted: true,
  },
  {
    id: 668,
    title: "Rails Two-Sided Marketplace",
    isCompleted: true,
  },
  {
    id: 669,
    title: "React + Node API Project",
    isCompleted: false,
  },
];

router.get('/projects', function(req, res) {
  res.json(projects);
});

// Insert into the projects array
router.post('/projects', function(req, res) {
  // Assign an id
  res.status(201).send();
});

// Update an existing project
router.put('/projects', function(req, res) {
  // const id = req.body.id;
  console.dir(req.body);
  res.status(204).send();
});

module.exports = router;
