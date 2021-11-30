const express = require('express');

const {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
} = require('../../controllers/api/session');
const {
  isSessionExists,
  isRefExists,
} = require('../../middlewares/api/session');

const router = express.Router();

router
  .get('/', getSessions)
  .get('/:id', isSessionExists, getSession)
  .post('/', isRefExists, createSession)
  .patch('/:id', isSessionExists, isRefExists, updateSession)
  .delete('/:id', isSessionExists, deleteSession)

  
module.exports = router;