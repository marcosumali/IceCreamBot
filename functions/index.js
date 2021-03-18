require('dotenv').config()
const functions = require('firebase-functions');
const fs = require('fs');
const pdf = require('pdf-parse');
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const PDFParser = require("pdf2json");
let pdfParser = new PDFParser();
const {isDate} = require('date-fns');
// const db = require('./config/firebase')
// const {WebhookClient} = require('dialogflow-fulfillment');
// const {Card, Suggestion} = require('dialogflow-fulfillment');
  
// process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log('request:', request.body)
  response.send("Hello from Firebase!");
});


exports.sendWhatsappTwilio = functions.https.onRequest((req, res) => {
  const {TWILIO_ACC_ID, TWILIO_AUTH_TOKEN} = process.env
  const client = require('twilio')(TWILIO_ACC_ID, TWILIO_AUTH_TOKEN); 
  
  client.messages 
    .create({ 
      body: 'Haiyohhhh this is your Twilio code lor is 1238432 lah. Bojio. Siao.', 
      from: 'whatsapp:+14155238886',       
      to: 'whatsapp:+628111777802' 
    }) 
    .then(message => {
      if (message.status) {
        console.log('success:', message)
        res.status(200).send('send message:', message.status)
      } else {
        console.log('check:', message)
        res.status(400).send('send message')
      }
    }) 
    .done();

});

exports.pdfParser = functions.https.onRequest(async(request, response) => {
    const spaceRegex = /%20/g
    const commaRegex = /%2C/g
    const backSlashRegex = /%2F/g
    const numberOnlyRegex = /^[0-9]+$/
    // const stripeRegex = /-/
    const stripeRegex = /-/g
    const currencyRegex = /,00/g
  // -------------------------------------------------------- pdf.js Test --------------------------------------------------------
  // nomor bupot && npwp: kendala di gambar image | length 15 dan number only
  // nama npwp ?
  // masa pajak: length 6 7, stripe regex count 1, isDate
  // kode objek pajak: length < 12, stripe regex count 2, is not Date, listed in our code
  // penghasilan bruto, income tax: contain ,00
  // tarif: dari kode pajak
  // extra tarif: using calculation

  var loadingTask = pdfjsLib.getDocument('./doc/tax.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/Birotika 3300000190.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document(1).pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document(2).pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/document(3).pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/eBukpot1.pdf');
  // var loadingTask = pdfjsLib.getDocument('./doc/Contoh Elektronik Bukti Potong.pdf');
  loadingTask.promise
  .then(function(pdf) {
    // you can now use *pdf* here
    pdf.getPage(1)
    .then(function(page) {
      // you can now use *page* here
      // console.log('>>:', page)
      page.getTextContent()
      .then(texts => {
        // texts.items.map((text, index) => console.log(`check:${index}`, text.str))
        // const slice = texts.items.slice(texts.items.length-10, texts.items.length)
        // console.log('check: test', slice.length)
        // slice.map((text, index) => console.log(`check:${index}`, text.str))
        // var count = (test.match(/-/g) || []).length;
        const filter = texts.items.filter(text => text.str.length >= 6 && text.str.length <= 7 && text.str.match(stripeRegex) ? text.str.match(stripeRegex).length == 1 : false)
        console.log('check: filter', filter.length)
        console.log('check: filter', filter)
        // console.log('check: no:', texts.items[127].str, texts.items[127].str.length, texts.items[127].str.match(stripeRegex).length)
        // console.log('check: no:', texts.items[135].str, texts.items[135].str.length, numberOnlyRegex.test(texts.items[135].str))
      })
      .catch(err => console.log('ERROR: get text', err))
    })
    .catch(err => console.log('ERROR: get page', err))
  })
  .catch(err => console.log('ERROR: get document', err))

  // -------------------------------------------------------- pdf2JSON Test --------------------------------------------------------
  // // let dataBuffer = fs.readFileSync('./doc/tax.pdf');
  // // let dataBuffer = fs.readFileSync('./doc/Birotika 3300000190.pdf');
  // let dataBuffer = fs.readFileSync('./doc/document.pdf');

  // pdfParser.parseBuffer(dataBuffer)

  // pdfParser.on("pdfParser_dataReady", pdfData => {
  //   // for (let i = 0; i <= 300; i++) {
  //   //   if (pdfData.formImage.Pages[0].Texts[i]) {
  //   //     console.log(`test:${i}`, pdfData.formImage.Pages[0].Texts[i].R[0].T)
  //   //   } else {
  //   //     console.log(`err:${i}`, pdfData.formImage.Pages[0].Texts[i])
  //   //   }
  //   // }

  //   // 4 jenis pph x 16 17 y 3 4
  //   // 117 nomor bupot x 14 15 y 4 5
  //   // 118 nomor npwp x 8 9 y 7 8 w 75 85
  //   // 119 nama npwp x 8 9 y 9 10 w 95 105 > 16
  //   // 126 masa pajak x 3 4 y 17 20 w 24 31 > 16 ??? got 2 on biro
  //   // 127 kode objek pajak x 8 9 y 17 20 w 36 45 
  //   // 128 penghasilan bruto
  //   // 129 tarif 100%
  //   // 130 tarif
  //   // 131 incom tax
  //   // 132 - 134 detail dokumen refrensi

  //   const spaceRegex = /%20/g
  //   const replaceSpace = (text) => text.replace(spaceRegex, ' ') 
  //   const commaRegex = /%2C/g
  //   const replaceComma = (text) => text.replace(commaRegex, ',') 
  //   const backSlashRegex = /%2F/g
  //   const replaceBackSlash = (text) => text.replace(backSlashRegex, '/') 

  //   const targetPage = 0
  //   const convertedPage = pdfData.formImage.Pages[targetPage]

  //   let filter = convertedPage.Texts.filter(text => text.R[0].T.length == 10)
  //   // let filter = convertedPage.Texts.filter(text => Math.floor(text.x) >= 16 && Math.floor(text.x) <= 17 && Math.floor(text.y) >= 3 && Math.floor(text.y) <= 4)
  //   // let filter = convertedPage.Texts.filter(text => Math.floor(text.x) >= 8 && Math.floor(text.x) <= 9 && Math.floor(text.y) >= 17 && Math.floor(text.y) <= 20 && Math.floor(text.w) >= 16)
  //   console.log(`test:`, filter.length)
  //   console.log(`test:`, filter[0])
  //   console.log(`test:`, filter[1])
  //   console.log(`test:`, filter[2])
  //   console.log(`test:`, filter[3])

  //   // console.log(`test:`, convertedPage.Texts[4])

  //   // const incomeTaxArticleNo = replaceSpace(convertedPage.Texts[4].R[0].T)
  //   // const incomeTaxCertificateNo = convertedPage.Texts[117].R[0].T
  //   // const taxPayerNPWPNo = convertedPage.Texts[118].R[0].T
  //   // const taxPayer = replaceSpace(convertedPage.Texts[119].R[0].T)
  //   // const taxPeriod = convertedPage.Texts[126].R[0].T
  //   // const taxObjectCode = convertedPage.Texts[127].R[0].T
  //   // const grossIncome = replaceComma(convertedPage.Texts[128].R[0].T)
  //   // const extraTariff = convertedPage.Texts[129].R[0].T
  //   // const tariff = convertedPage.Texts[130].R[0].T
  //   // const incomeTax = replaceComma(convertedPage.Texts[131].R[0].T)
  //   // const refDocName = convertedPage.Texts[132].R[0].T
  //   // const refDocNo = replaceSpace(replaceBackSlash(convertedPage.Texts[133].R[0].T)).trim()
  //   // const refDocDate = replaceBackSlash(convertedPage.Texts[134].R[0].T)

  //   // console.log(`PPh Pasal: ${incomeTaxArticleNo}`)
  //   // console.log(`No. Bukti Potong: ${incomeTaxCertificateNo}`)
  //   // console.log(`Wajib Pajak: ${taxPayerNPWPNo} - ${taxPayer}`)
  //   // console.log(`--------------------------------------------`)
  //   // console.log(`Masa Pajak: ${taxPeriod}`)
  //   // console.log(`Kode Objek Pajak: ${taxObjectCode}`)
  //   // console.log(`Jumlah Penghasilan Bruto (Rp): ${grossIncome}`)
  //   // console.log(`Tarif Lebih Tinggi 100%: ${extraTariff}`)
  //   // console.log(`Tarif (%): ${tariff}`)
  //   // console.log(`PPh Dipotong (Rp): ${incomeTax}`)
  //   // console.log(`--------------------------------------------`)
  //   // console.log(`Dok. Referensi: ${refDocName} - ${refDocNo} - ${refDocDate}`)
  // });

  // -------------------------------------------------------- pdf-parse Test --------------------------------------------------------
  // // let dataBuffer = fs.readFileSync('./doc/tax.pdf');
  // let dataBuffer = fs.readFileSync('./doc/Birotika 3300000190.pdf');
  // pdf(dataBuffer).then(function(data) {
  //   // // number of pages
  //   // console.log('0', data.numpages);
  //   // // number of rendered pages
  //   // console.log('1', data.numrender);
  //   // // PDF info
  //   // console.log('2', data.info);
  //   // // PDF metadata
  //   // console.log('3', data.metadata); 
  //   // // PDF.js version
  //   // // check https://mozilla.github.io/pdf.js/getting_started/
  //   // console.log('4', data.version);
  //   // // PDF text
  //   // console.log('5', data.text);

  //   const text = data.text
  //   const texts = text.split("\n").slice(100, 120)
  //   console.log('check:', texts)
  // });

  response.send("Done");
});

// exports.iceCreamWebhook = functions.https.onRequest((request, response) => {
//   const agent = new WebhookClient({ request, response });
//   console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
//   console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
//   function welcome(agent) {
//     agent.add(`Welcome to my agent!`);
//   }
 
//   function fallback(agent) {
//     agent.add(`I didn't understand`);
//     agent.add(`I'm sorry, can you try again?`);
//   }

//   function paymentRequest(agent) {
//     agent.add(`We have two options:`);
//     agent.add(`Cash ord credit card?`);
//   }

//   async function askAvailableFlavors(agent) {
//     const stocksRef = db.collection('stocks')
//     const stockSnapshot = stocksRef.where('quantity', '>', 0).get()
//     console.log('check0:', stockSnapshot)
//     const availableFlavors = []
//     stockSnapshot.forEach(doc => {
//       const data = doc.data()
//       data.id = doc.id
//       availableFlavors.push(data)
//     });
//     console.log('check1:', availableFlavors)
//     agent.add(`Flavors: empty`)
//   }

//   // // Uncomment and edit to make your own intent handler
//   // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
//   // // below to get this function to be run when a Dialogflow intent is matched
//   // function yourFunctionHandler(agent) {
//   //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
//   //   agent.add(new Card({
//   //       title: `Title: this is a card title`,
//   //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
//   //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
//   //       buttonText: 'This is a button',
//   //       buttonUrl: 'https://assistant.google.com/'
//   //     })
//   //   );
//   //   agent.add(new Suggestion(`Quick Reply`));
//   //   agent.add(new Suggestion(`Suggestion`));
//   //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
//   // }

//   // // Uncomment and edit to make your own Google Assistant intent handler
//   // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
//   // // below to get this function to be run when a Dialogflow intent is matched
//   // function googleAssistantHandler(agent) {
//   //   let conv = agent.conv(); // Get Actions on Google library conv instance
//   //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
//   //   agent.add(conv); // Add Actions on Google library responses to your agent's response
//   // }
//   // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
//   // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

//   // Run the proper function handler based on the matched Dialogflow intent name
//   let intentMap = new Map();
//   intentMap.set('Default Welcome Intent', welcome);
//   intentMap.set('Default Fallback Intent', fallback);
//   intentMap.set('0 - Ask Flavors', askAvailableFlavors);
//   intentMap.set('2 - Payment Request', paymentRequest);
//   // intentMap.set('your intent name here', yourFunctionHandler);
//   // intentMap.set('your intent name here', googleAssistantHandler);
//   agent.handleRequest(intentMap);
// });


