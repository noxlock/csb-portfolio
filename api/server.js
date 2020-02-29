const express = require('express');
const projectsRouter = require('./routes/projects.js');
const bodyParser = require('body-parser');
const server = express();
const port = 7000;

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/api', projectsRouter);

server.listen(port, function () {
  console.log(`API Server is running on port ${port}`);
});
