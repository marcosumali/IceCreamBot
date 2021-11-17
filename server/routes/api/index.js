const express = require('express');

const botRouter = require('./bot');

const router = express.Router();

router
  .use('/bots', botRouter)

  
module.exports = router;