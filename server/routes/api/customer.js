const express = require('express');

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../../controllers/api/customer');
const {isCustomerExists} = require('../../middlewares/api/customer');

const router = express.Router();

router
  .get('/', getCustomers)
  .get('/:id', isCustomerExists, getCustomer)
  .post('/', createCustomer)
  .patch('/:id', isCustomerExists, updateCustomer)
  .delete('/:id', isCustomerExists, deleteCustomer)

  
module.exports = router;