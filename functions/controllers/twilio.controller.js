const db = require('../config/firebase')

const helloWorld = async (req, res, next) => {
  // res.status(200).json({text: 'hello world api !'})
  const stocksRef = db.collection('stocks')
  const stockSnapshot = await stocksRef.where('quantity', '>', 0).get()
  // console.log('check0:', stockSnapshot)
  const availableFlavors = []
  stockSnapshot.forEach(doc => {
    const data = doc.data()
    data.id = doc.id
    availableFlavors.push(data)
  });
  console.log('check1:', availableFlavors)
  res.send("Hello from Firebase!");
}

const sendWhatsapp = (req, res, next) => {
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
        res.status(200).json({status: message.status})
      } else {
        console.log('check:', message)
        res.status(400).json({status: 'ERROR: send message'})
      }

      return message
    })
    .done()
    .catch(err => console.log('ERROR: twilio', err))
}

module.exports = {
  sendWhatsapp,
  helloWorld,
}