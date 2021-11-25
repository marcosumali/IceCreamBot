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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Store',
  },
});

const Bot = mongoose.model('Bot', botSchema);


module.exports = Bot;