const Message = require('../../models/api/message');
const Session = require('../../models/api/session');
const Customer = require('../../models/api/customer');
const Bot = require('../../models/api/bot');
const Sender = require('../../models/api/sender');
const {generateError} = require('../../helper/utils');

const isMessageExists = async (req, res, next) => {
  let message
  try {
    message = await Message.findById(req.params.id)
    if (!message) {
      const error = generateError(404, `Message doesn't exists`)
      next(error)
    }
  } catch (err) {
    console.log('ERROR:', err.stack)
    const error = generateError(500, err.message)
    next(error)
  }

  res.message = message
  next()
};

const isRefExists = async (req, res, next) => {
  const refError = []
  try {
    const session = await Session.findById(req.body.sessionId)
    const sender = await Sender.findById(req.body.senderId)
    if (!session) refError.push('Session')
    if (!sender) refError.push('Sender')
    const refJoined = refError.join(', ')
    const refString = refJoined.trim().slice(0, refJoined.length)
    if (refError.length > 0) {
      const error = generateError(404, `Reference doesn't exists: ${refString}`)
      next(error)
    }
  } catch (err) {
    console.log('ERROR:', err.stack)
    const error = generateError(500, err.message)
    next(error)
  }

  next()
};


module.exports = {
  isMessageExists,
  isRefExists,
}
