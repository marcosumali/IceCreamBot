const Message = require('../../models/api/message');
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
    const customer = await Customer.findById(req.body.customerId)
    const bot = await Bot.findById(req.body.botId)
    const sender = await Sender.findById(req.body.senderId)
    if (!customer) refError.push('Customer')
    if (!bot) refError.push('Bot')
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
