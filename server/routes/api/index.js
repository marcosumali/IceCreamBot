const express = require('express');

const storeRouter = require('./store');
const botRouter = require('./bot');

const router = express.Router();

router
  .use('/stores', storeRouter)
  .use('/bots', botRouter)

  
module.exports = router;