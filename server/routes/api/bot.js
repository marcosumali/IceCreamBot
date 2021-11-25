const express = require('express');

const {
  getBots,
  getBot,
  createBot,
  updateBot,
  deleteBot,
} = require('../../controllers/api/bot');
const {isBotExists} = require('../../middlewares/api/bot');

const router = express.Router();

router
  .get('/', getBots)
  .get('/:id', isBotExists, getBot)
  .post('/', createBot)
  .patch('/:id', isBotExists, updateBot)
  .delete('/:id', isBotExists, deleteBot)

  
module.exports = router;