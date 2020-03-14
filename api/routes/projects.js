const express = require('express');
const shortId = require('shortid');
const { verify, authoriseRole } = require('../middleware/auth');
const router = express.Router();
const Project = require('../models/Project');

router.get('/projects', verify, authoriseRole('projects:read'), function(req, res) {
  Project.find()
    .then((projects) => {
      res.json(projects);
    })
    .catch((error) => {
      res.json({ error });
    })
});

router.get('/projects/:id', verify, function(req, res) {
  const id = req.params.id;
  Project.findById(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        return Promise.reject({ message: `Project ${id} not found` })
      }
    })
    .catch(error => {
      res.status(404).json({ error })
    })
})

// Insert into the projects array
router.post('/projects', verify, authoriseRole('projects:write'), function(req, res) {
  const attrs = req.body
  Project.create(attrs)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(404).json({ error });
    })
});

// Update an existing project
router.put('/projects/:id', verify, function(req, res) {
  const id = req.params.id;
  const attrs = req.body;
  Project.findByIdAndUpdate(id, attrs)
    .then(project => {
      res.status(204).json(project);
    })
    .catch(error => {
      res.status(404).json({ error });
    })
});

// Destroy an existing project
router.delete('/projects/:id', verify, function(req, res) {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(404).send(error)
    })
});

module.exports = router;
