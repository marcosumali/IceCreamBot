const mongoose = require('mongoose');

const senderSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  _id: false
});

const Sender = mongoose.model('Sender', senderSchema);


module.exports = Sender;