const express = require('express');

const storeRouter = require('./store');
const botRouter = require('./bot');
const senderRouter = require('./sender');
const customerRouter = require('./customer');

const router = express.Router();

router
  .use('/stores', storeRouter)
  .use('/bots', botRouter)
  .use('/senders', senderRouter)
  .use('/customers', customerRouter)

  
module.exports = router;