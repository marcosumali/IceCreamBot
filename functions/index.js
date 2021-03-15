const functions = require('firebase-functions');
// const db = require('./config/firebase')
// const {WebhookClient} = require('dialogflow-fulfillment');
// const {Card, Suggestion} = require('dialogflow-fulfillment');
const fs = require('fs');
const pdf = require('pdf-parse');
const PDFParser = require("pdf2json");
let pdfParser = new PDFParser();
  
// process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.pdfParser = functions.https.onRequest(async(request, response) => {
  let dataBuffer = fs.readFileSync('./tax.pdf');

  pdfParser.parseBuffer(dataBuffer)

  pdfParser.on("pdfParser_dataReady", pdfData => {
    // for (let i = 100; i <= 120; i++) {
    //   if (pdfData.formImage.Pages[0].Texts[i]) {
    //     console.log(`test:${i}`, pdfData.formImage.Pages[0].Texts[i].R[0].T)
    //   } else {
    //     console.log(`err:${i}`, pdfData.formImage.Pages[0].Texts[i])
    //   }
    // }

    // 4 jenis pph
    // 117 nomor bupot
    // 118 - 119 nomor & nama npwp
    // 126 - 131 detail pajak
    // 132 - 134 detail dokumen refrensi

    const spaceRegex = /%20/g
    const replaceSpace = (text) => text.replace(spaceRegex, ' ') 
    const commaRegex = /%2C/g
    const replaceComma = (text) => text.replace(commaRegex, ',') 
    const backSlashRegex = /%2F/g
    const replaceBackSlash = (text) => text.replace(backSlashRegex, '/') 

    const targetPage = 0
    const convertedPage = pdfData.formImage.Pages[targetPage]

    const incomeTaxArticleNo = replaceSpace(convertedPage.Texts[4].R[0].T)
    const incomeTaxCertificateNo = convertedPage.Texts[117].R[0].T
    const taxPayerNPWPNo = convertedPage.Texts[118].R[0].T
    const taxPayer = replaceSpace(convertedPage.Texts[119].R[0].T)
    const taxPeriod = convertedPage.Texts[126].R[0].T
    const taxObjectCode = convertedPage.Texts[127].R[0].T
    const grossIncome = replaceComma(convertedPage.Texts[128].R[0].T)
    const extraTariff = convertedPage.Texts[129].R[0].T
    const tariff = convertedPage.Texts[130].R[0].T
    const incomeTax = replaceComma(convertedPage.Texts[131].R[0].T)
    const refDocName = convertedPage.Texts[132].R[0].T
    const refDocNo = replaceSpace(replaceBackSlash(convertedPage.Texts[133].R[0].T)).trim()
    const refDocDate = replaceBackSlash(convertedPage.Texts[134].R[0].T)

    console.log(`PPh Pasal: ${incomeTaxArticleNo}`)
    console.log(`No. Bukti Potong: ${incomeTaxCertificateNo}`)
    console.log(`Wajib Pajak: ${taxPayerNPWPNo} - ${taxPayer}`)
    console.log(`--------------------------------------------`)
    console.log(`Masa Pajak: ${taxPeriod}`)
    console.log(`Kode Objek Pajak: ${taxObjectCode}`)
    console.log(`Jumlah Penghasilan Bruto (Rp): ${grossIncome}`)
    console.log(`Tarif Lebih Tinggi 100%: ${extraTariff}`)
    console.log(`Tarif (%): ${tariff}`)
    console.log(`PPh Dipotong (Rp): ${incomeTax}`)
    console.log(`--------------------------------------------`)
    console.log(`Dok. Referensi: ${refDocName} - ${refDocNo} - ${refDocDate}`)
  });


  // pdf(dataBuffer, options).then(function(data) {
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
  //   console.log('5', data.text);

  //   // const text = data.text
  //   // const texts = text.split("\n").slice(100, 120)
  //   // console.log('check:', texts)
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


