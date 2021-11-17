// Define required dependencies
require('dotenv').config();
const express = require('express');

// Create an Express application. 
// The express() function is a top-level function exported by the express module.
const app = express();

// Define constant variables, if necessary
const PORT = process.env.PORT || 3000;

// Binds and listens for connections on the specified host and port. 
app.listen(PORT, () => console.log(`App is listening at http://localhost:${PORT}`));


module.exports = app;