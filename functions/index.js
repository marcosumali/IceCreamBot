require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const twilioRouter = require('./routes/twilio');
const pdfParseRouter = require('./routes/pdfParser');
const iceCreamRouter = require('./routes/iceCreamBot');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// use cors
app.use(cors);

app.use('/twilio', twilioRouter)
app.use('/pdf', pdfParseRouter)
app.use('/bot', iceCreamRouter)


exports.api = functions.https.onRequest(app);