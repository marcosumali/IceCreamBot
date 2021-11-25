const mongoose = require('mongoose');

const botSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  storeId: {
    type: String,
    required: true,
  },
});

const Bot = mongoose.model('Bot', botSchema);


module.exports = Bot;