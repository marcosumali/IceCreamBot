const Session = require('../../models/api/session');
const Customer = require('../../models/api/customer');
const Bot = require('../../models/api/bot');
const {generateError} = require('../../helper/utils');

const isSessionExists = async (req, res, next) => {
  let session
  try {
    session = await Session.findById(req.params.id)
    if (!session) {
      const error = generateError(404, `Session doesn't exists`)
      next(error)
    }
  } catch (err) {
    console.log('ERROR:', err.stack)
    const error = generateError(500, err.message)
    next(error)
  }

  res.session = session
  next()
};

const isRefExists = async (req, res, next) => {
  const refError = []
  try {
    const bot = await Bot.findById(req.body.botId)
    // const customer = await Customer.findById(req.body.customerId)
    if (!bot) refError.push('Bot')
    // if (!customer) refError.push('Customer')
    const refJoined = refError.join(', ') // Ex: `Bot, Customer, `
    const refString = refJoined.trim().slice(0, refJoined.length) // Ex: `Bot, Customer`
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
  isSessionExists,
  isRefExists,
}
