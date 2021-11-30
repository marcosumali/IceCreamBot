const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Bot',
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
});

const Session = mongoose.model('Session', sessionSchema);


module.exports = Session;