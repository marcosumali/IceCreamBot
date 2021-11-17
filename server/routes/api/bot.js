const express = require('express');

const {
} = require('../../controllers/api/bot');

const router = express.Router();

router
  .get('/', (req, res) => {
    res.status(200).json('yeyy')
  })

  
module.exports = router;