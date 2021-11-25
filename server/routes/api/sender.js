const express = require('express');

const {
  getSenders,
  getSender,
  createSender,
  updateSender,
  deleteSender,
} = require('../../controllers/api/sender');
const {isSenderExists} = require('../../middlewares/api/sender');

const router = express.Router();

router
  .get('/', getSenders)
  .get('/:id', isSenderExists, getSender)
  .post('/', createSender)
  .patch('/:id', isSenderExists, updateSender)
  .delete('/:id', isSenderExists, deleteSender)

  
module.exports = router;