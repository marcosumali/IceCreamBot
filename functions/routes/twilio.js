const express = require('express');

const {
  helloWorld,
  sendWhatsapp,
} = require('../controllers/twilio.controller')

const twilio = express.Router();

twilio
  .get('/helloWorld', helloWorld)
  .get('/sendWhatsapp', sendWhatsapp)


module.exports = twilio;

