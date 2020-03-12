const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/portfolio',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.error('Error connecting to mongodb', error);
  });

module.exports = mongoose;
