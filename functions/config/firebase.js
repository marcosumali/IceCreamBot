const admin = require('firebase-admin');

const serviceAccount = require('./icecreambot-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://IceCreamBot.firebaseio.com",
});

const db = admin.firestore();

module.exports = db;