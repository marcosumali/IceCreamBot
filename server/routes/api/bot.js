const express = require('express');

const {
  getBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
} = require('../../controllers/api/bot');
const {
  isBotExists,
  isStoreExists,
} = require('../../middlewares/api/bot');

const router = express.Router();

router
  .get('/', getBots)
  .get('/:id', isBotExists, getBot)
  .post('/', isStoreExists, createBot)
  .patch('/:id', isBotExists, isStoreExists, updateBot)
  .delete('/:id', isBotExists, deleteBot)

  
module.exports = router;