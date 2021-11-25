const express = require('express');

const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../../controllers/api/message');
const {
  isMessageExists,
  isRefExists,
} = require('../../middlewares/api/message');

const router = express.Router();

router
  .get('/', getMessages)
  .get('/:id', isMessageExists, getMessage)
  .post('/', isRefExists, createMessage)
  .patch('/:id', isMessageExists, updateMessage)
  .delete('/:id', isMessageExists, deleteMessage)

  
module.exports = router;