const express = require('express');

const {
  dialogflowWebhook,
} = require('../controllers/iceCream.controller')

const iceCreamBot = express.Router();

iceCreamBot
  .get('/webhook', dialogflowWebhook)


module.exports = iceCreamBot;