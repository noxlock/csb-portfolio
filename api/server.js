const express = require('express');
const projectsRouter = require('./routes/projects.js');
const server = express();
const port = 7000;

server.use('/api', projectsRouter);

server.listen(port, function () {
  console.log(`API Server is running on port ${port}`);
});
