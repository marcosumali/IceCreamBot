const express = require('express');

const {
  getMessages,
  getMessage,
  getSpecificMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../../controllers/api/message');
const {
  isMessageExists,
  isRefExists,
} = require('../../middlewares/api/message');
const {isSessionExists} = require('../../middlewares/api/session');

const router = express.Router();

router
  .get('/', getMessages)
  .get('/:id', isMessageExists, getMessage)
  .get('/sessions/:id', isSessionExists, getSpecificMessages)
  .post('/', isRefExists, createMessage)
  .patch('/:id', isMessageExists, isRefExists, updateMessage)
  .delete('/:id', isMessageExists, deleteMessage)

  
module.exports = router;