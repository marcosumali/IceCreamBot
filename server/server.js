// Define required dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
const mongoose = require('mongoose');

// Import required files
const rootRouter = require('./routes');
const {generateError} = require('./helper/utils');

// Create an Express application. 
// The express() function is a top-level function exported by the express module.
const app = express();

// Define constant variables, if necessary
const PORT = process.env.PORT || 3000;
const MAX_TIMEOUT = 30000 // Equal to 30 seconds

// Enables CORS services
app.use(cors());

// Enables body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enables connection to database
mongoose.connect('mongodb://localhost/stockbot_erp')
mongoose.connection
 .on('error', (err) => console.error('Database connection error:', err))
 .once('open', () => console.log('Server is connected to database'))

// Binds and listens for connections on the specified host and port. 
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

// Enables root router
app.use('/', rootRouter);

// Enables service timeout
app.use(timeout(MAX_TIMEOUT));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = generateError(404, 'Incorrect path')
  next(error);
});

// Catch timeout error
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// Error handler
app.use((err, req, res, next) => {
  if (err.code === 'ETIMEDOUT') res.status(500).json({message: 'Server request timeout error'})

  if (err) {
    const {code, error} = err
    res.status(code).json({message: error.message})
  }

  res.status(500).json({message: 'Internal server error'})
});


module.exports = app;