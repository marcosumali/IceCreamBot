const express = require('express');

const apiRouter = require('./api');

const router = express.Router();
const version = '0.0.1';

router
  .get('/', (req, res) => res.send(`Version: v${version}`))
  .use('/api', apiRouter)

  
module.exports = router;