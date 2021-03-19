const express = require('express');

const {
  pdfParserHook
} = require('../controllers/pdf.controller')

const pdf = express.Router();

pdf
  .get('/parse', pdfParserHook)


module.exports = pdf;