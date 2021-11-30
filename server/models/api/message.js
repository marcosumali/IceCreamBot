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
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Session',
  },
  senderId: {
    type: String,
    required: true,
    ref: 'Sender',
  },
});

const Message = mongoose.model('Message', messageSchema);


module.exports = Message;