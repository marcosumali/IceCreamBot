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
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// use cors
app.use(cors);

app.use('/twilio', twilioRouter)
app.use('/pdf', pdfParseRouter)
app.use('/bot', iceCreamRouter)


exports.api = functions.https.onRequest(app);

const {WebhookClient} = require('dialogflow-fulfillment');
const db = require('./config/firebase')

exports.smartIceCreamBotWebhook = functions.https.onRequest((request, response) => {
  console.log('check:0', request.body)
  const agent = new WebhookClient({request, response})
  
  const result = request.body.queryResult
  console.log('check:1', JSON.stringify(result))

  function welcome(agent) {
    agent.add('Welcome to my agent')
  }

  function fallback(agent) {
    agent.add('Sorry, can you try again?')
  }

  async function faqAvailableFlavors(agent) {
    const stocksRef = db.collection('stocks')

    const stocksQuerySnapshot = await stocksRef.where('quantity', '>', 0).get()

    const availableFlavors = []
    stocksQuerySnapshot.forEach(doc => {
      const id = doc.id
      let stock = doc.data()
      stock.id = id
      availableFlavors.push(stock)
    })

    const availableFlavorLists = availableFlavors.map(flavor => flavor.name).join(',')

    console.log('check:2', availableFlavors)
    console.log('check:3', availableFlavorLists)

    agent.add(`Heyo ! Our currently available ${availableFlavors.length > 1 ? `flavors are` : `flavor is`} ${availableFlavorLists}.`)

    // agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    // agent.add(new Card({
    //     title: `Title: this is a card title`,
    //     imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //     text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //     buttonText: 'This is a button',
    //     buttonUrl: 'https://assistant.google.com/'
    //   })
    // );
    // agent.add(new Suggestion(`Quick Reply`));
    // agent.add(new Suggestion(`Suggestion`));
  }

  async function availableFlavors(agent) {
    const {name} = result.parameters

    const stocksRef = db.collection('stocks')

    const stocksQuerySnapshot = await stocksRef.where('quantity', '>', 0).get()

    const availableFlavors = []
    stocksQuerySnapshot.forEach(doc => {
      const id = doc.id
      let stock = doc.data()
      stock.id = id
      availableFlavors.push(stock)
    })

    const availableFlavorLists = availableFlavors.map(flavor => flavor.name).join(',')

    agent.add(`Okay ${name}, what flavors would you like? We have ${availableFlavorLists}.`)
  }

  async function getSizeAndFlavors(agent) {
    const {name, flavors} = result.parameters
    let textResponse = ''

    const stocksRef = db.collection('stocks')

    const stocksQuerySnapshot = await stocksRef.where('quantity', '>', 0).get()

    const availableFlavors = []
    stocksQuerySnapshot.forEach(doc => {
      const id = doc.id
      let stock = doc.data()
      stock.id = id
      availableFlavors.push(stock)
    })

    const isFlavorAvailableIndex = availableFlavors.findIndex(stock => stock.name === flavors)
    const availableFlavorLists = availableFlavors.map(flavor => flavor.name).join(',')

    if (isFlavorAvailableIndex > -1) {
      textResponse = `Okay ${name}, what size would you like to order? We have small, medium, or large.`
    } else {
      textResponse = `Hey ${name}, unfortunately our shop don't have ${flavors}. But we have ${availableFlavorLists}. Which flavor would you like?`
    }

    agent.add(textResponse)
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback)
  intentMap.set('0 - Ask Flavors', faqAvailableFlavors)
  intentMap.set('Order_start', availableFlavors)
  intentMap.set('Order_sizes', getSizeAndFlavors)

  agent.handleRequest(intentMap)
});
