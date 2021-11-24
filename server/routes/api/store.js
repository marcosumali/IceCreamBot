const express = require('express');

const {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
} = require('../../controllers/api/store');
const {isStoreExists} = require('../../middlewares/api/store');

const router = express.Router();

router
  .get('/', getStores)
  .get('/:id', isStoreExists, getStore)
  .post('/', createStore)
  .patch('/:id', isStoreExists, updateStore)
  .delete('/:id', isStoreExists, deleteStore)

  
module.exports = router;