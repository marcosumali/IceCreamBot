const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
    default: () => Date.now(),
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Bot',
  },
  senderId: {
    type: String,
    required: true,
    ref: 'Sender',
  },
});

const Message = mongoose.model('Message', messageSchema);


module.exports = Message;