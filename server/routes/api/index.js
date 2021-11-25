const express = require('express');

const storeRouter = require('./store');
const botRouter = require('./bot');
const senderRouter = require('./sender');

const router = express.Router();

router
  .use('/stores', storeRouter)
  .use('/bots', botRouter)
  .use('/senders', senderRouter)

  
module.exports = router;