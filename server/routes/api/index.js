const express = require('express');

const storeRouter = require('./store');
const botRouter = require('./bot');
const senderRouter = require('./sender');
const customerRouter = require('./customer');
const messageRouter = require('./message');
const sessionRouter = require('./session');

const router = express.Router();

router
  .use('/stores', storeRouter)
  .use('/bots', botRouter)
  .use('/senders', senderRouter)
  .use('/customers', customerRouter)
  .use('/sessions', sessionRouter)
  .use('/messages', messageRouter)

  
module.exports = router;